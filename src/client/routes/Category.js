import React from "react";
import MainCard from "client/components/MainCard";

export default function Category(props) {
  return (
    <MainCard
      header={
        <h2 className="h5 mb-0">Packages tagged with "{props.category}"</h2>
      }
    >
      {null}
    </MainCard>
  );
}
