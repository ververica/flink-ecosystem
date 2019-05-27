import React from "react";
import MainCard from "client/components/MainCard";

export default function Package(props) {
  return <MainCard header={`Package: ${props.package} `}>{null}</MainCard>;
}
