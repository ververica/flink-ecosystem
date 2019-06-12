import React from "react";
import useFetch from "fetch-suspense";
import styled from "styled-components/macro";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import { Package as TPackage } from "client/components/PackageList";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
`;

export default function Package(props: Props) {
  const pkg = useFetch(`/api/v1/packages/${props.package}`) as TPackage;

  return (
    <MainCard header={`Package: ${pkg.name} `}>
      <div className="row">
        <div className="col-sm-3 order-last ">
          <div className="overflow-hidden d-flex justify-content-center">
            <Img src="https://lorempixel.com/640/480/city/" alt="something" />
          </div>
        </div>
        <div className="col-sm-9">{pkg.readme}</div>
      </div>
      <div className="row mt-3 justify-content-between">
        <div className="col-auto">
          <i className="fal fa-home mr-2 fa-fw" />
          {pkg.website}
          <br />
          <i className="fab fa-github mr-2 fa-fw" />
          {pkg.repository}
        </div>

        <div className="col-auto">License: {pkg.license}</div>
        <div className="col-auto">
          <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
          {pkg.upvotes}
          <span className="mr-3" />
          <i className="fal fa-thumbs-down mr-1" title="Downvotes" />
          {pkg.downvotes}
        </div>
      </div>
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  package: string;
}>;
