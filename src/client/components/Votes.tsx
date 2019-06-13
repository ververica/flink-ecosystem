import React, { useState, SyntheticEvent } from "react";
import styled from "styled-components";
import cx from "classnames";

const VoteContainer = styled.small.attrs<VoteContainerProps>(props => ({
  className: cx("mr-4", { "text-muted": !props.voted }),
}))<VoteContainerProps>`
  cursor: pointer;
`;

export default function Votes(props: Props) {
  const [{ vote, upvotes, downvotes }, setVoteState] = useState(props);

  const castVote: CastVote = (currentVote, change) => async e => {
    e.preventDefault();
    const newVote = currentVote !== change ? change : 0;
    try {
      const results = await fetch(`/api/v1/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: props.slug, id: props.id, vote: newVote }),
      }).then(r => {
        if (r.ok) {
          return r.json();
        } else {
          throw r;
        }
      });
      setVoteState(results);
    } catch (e) {}
  };

  return (
    <>
      <VoteContainer voted={vote > 0} onClick={castVote(vote, 1)}>
        <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
        {upvotes}
      </VoteContainer>
      <VoteContainer voted={vote < 0} onClick={castVote(vote, -1)}>
        <i className="fal fa-thumbs-down mr-1" title="Upvotes" />
        {downvotes}
      </VoteContainer>
    </>
  );
}

type Props = {
  downvotes: number;
  slug: string;
  upvotes: number;
  vote: number;
  id: number;
};

type CastVote = (
  currentVote: number,
  change: number
) => (e: SyntheticEvent) => void;

type VoteContainerProps = {
  voted: boolean;
};
