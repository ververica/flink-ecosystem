import React from "react";
import MainCard from "client/components/MainCard";

export default function Search(props) {
  return (
    <MainCard header={`Search results for "${props.searchQuery}"`}>
      {null}
    </MainCard>
  );
}
