import React from "react";
import MainCard from "client/components/MainCard";

export default function Category(props) {
  return (
    <MainCard header={`Packages tagged with "${props.category}"`}>
      {null}
    </MainCard>
  );
}
