import React, { useState, useReducer } from "react";
import styled from "styled-components";
import cx from "classnames";

type Props = {
  downvotes: number;
  slug: string;
  upvotes: number;
  vote: number;
};

const VoteContainer = styled.small`
  margin-right: 1.5rem;
  cursor: pointer;
`;

export default function Upvote(props: Props) {
  const [{ vote, upvotes, downvotes }, setVoteState] = useState(props);

  const castVote = (currentVote: number, change: number) => async (e: any) => {
    e.preventDefault();
    const newVote = currentVote !== change ? change : 0;
    fetch(`/api/v1/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: props.slug, vote: newVote }),
    })
      .then(r => r.json())
      .then(setVoteState);
  };

  return (
    <>
      <VoteContainer
        className={cx({ "text-muted": vote < 1 })}
        onClick={castVote(vote, 1)}
      >
        <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
        {upvotes}
      </VoteContainer>
      <VoteContainer
        className={cx({ "text-muted": vote > -1 })}
        onClick={castVote(vote, -1)}
      >
        <i className="fal fa-thumbs-down mr-1" title="Upvotes" />
        {downvotes}
      </VoteContainer>
    </>
  );
}
