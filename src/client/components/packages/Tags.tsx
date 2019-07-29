import React, { FC } from "react";
import { Badge, Col, Row } from "reactstrap";
import { categories } from "client/helpers/categories";
import { Link } from "@reach/router";

const categoryValues = categories.map(c => c.value);

export const Tags: FC<Props> = props => {
  const { category } = props;
  return (
    <>
      <hr />
      <Row className="align-items-baseline">
        <Col>
          <span>Tags: </span>
          <big>
            <Link to={`/categories/${category}`} className="mr-2">
              <Badge color="secondary">{category}</Badge>
            </Link>
            {props.tags
              .split(",")
              .map(tag => tag.trim())
              .filter(
                tag => tag.toLocaleLowerCase() !== category.toLocaleLowerCase()
              )
              .map((tag, i) => {
                const uriTag = encodeURIComponent(tag);
                const linkBase = categoryValues.includes(tag)
                  ? "categories"
                  : "search";
                return (
                  <Link to={`/${linkBase}/${uriTag}`} key={i} className="mr-2">
                    <Badge color="secondary">{tag}</Badge>
                  </Link>
                );
              })}
          </big>
        </Col>
      </Row>
    </>
  );
};

type Props = {
  tags: string;
  category: string;
};
