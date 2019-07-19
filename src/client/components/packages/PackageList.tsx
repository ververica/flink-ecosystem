import Dotdotdot from "react-dotdotdot";
import React, { FC } from "react";
import styled from "styled-components/macro";
import { CardText, Col, Row } from "reactstrap";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { Icon } from "../Icon";
import { Link } from "@reach/router";
import { PackageData } from "client/types/Package";
import { useScroll } from "client/helpers";
import { Votes } from "./Votes";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
  width: 100%;
`;

export const PackageList: FC<Props> = props => {
  useScroll(props.page);

  if (!props.packages.length) {
    return <h3>No packages found</h3>;
  }

  // Typescript can't return an array with out wrapping it in a fragment. :(
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-336384210
  return (
    <>
      {props.packages.map(pkg => {
        const packageImage = pkg.image_id ? (
          <Col
            md="3"
            className="overflow-hidden d-flex align-items-start justify-content-center"
          >
            <Link to={`/packages/${pkg.slug}`}>
              <Img src={`/api/v1/images/${pkg.slug}`} alt={pkg.name} />
            </Link>
          </Col>
        ) : null;

        return (
          <React.Fragment key={pkg.slug}>
            <Row>
              <Col>
                <h5 className="card-title">
                  <Link to={`/packages/${pkg.slug}`}>{pkg.name}</Link>
                </h5>
                <Dotdotdot className="card-text" clamp={5}>
                  {pkg.description}
                </Dotdotdot>
              </Col>
              {packageImage}
            </Row>
            <Row className="mb-3">
              <Col>
                <CardText className="mt-1 d-flex justify-content-between">
                  <span>
                    <Votes
                      id={pkg.id}
                      vote={pkg.vote}
                      slug={pkg.slug}
                      upvotes={pkg.upvotes}
                      downvotes={pkg.downvotes}
                    />
                    <Link to={`/packages/${pkg.slug}`} className="ml-4">
                      <small className="text-muted">
                        <Icon
                          icon={faComments}
                          marginRight={1}
                          title="comments"
                        />
                        {pkg.comments}
                      </small>
                    </Link>
                  </span>

                  <small>
                    Last Updated: {format(pkg.updated, "MM/DD/YYYY")}
                  </small>
                </CardText>
              </Col>
            </Row>
          </React.Fragment>
        );
      })}
    </>
  );
};

type Props = {
  packages: Array<PackageData>;
  page: number;
};
