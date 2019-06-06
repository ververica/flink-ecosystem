import React, { useState } from "react";
import styled from "styled-components";
import cx from "classnames";

type Props = {
  downvoted: boolean;
  downvotes: number;
  slug: string;
  upvoted: boolean;
  upvotes: number;
};

const VoteContainer = styled.small`
  cursor: pointer;
`;

const votesClass = (voted: boolean) => cx("mr-4", { "text-muted": !voted });

export default function Upvote(props: Props) {
  const [upvoted, setUpvoted] = useState(props.upvoted);
  const [downvoted, setDownvoted] = useState(props.downvoted);
  const [upvotedCount, setUpvotedCount] = useState(props.upvotes);
  const [downvoteCount, setDownvotedCount] = useState(props.downvotes);

  const voteRequest = (voteType: string) => async (e: any) => {
    e.preventDefault();
    // if not logged in, send message to login for voting

    const { upvotes, downvotes } = await fetch(`/api/v1/${voteType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: props.slug,
      }),
    }).then(r => r.json());

    if (upvotes !== undefined) setUpvoted(upvotes);
    if (downvotes !== undefined) setDownvoted(downvotes);

    // @TODO adjust counts
  };

  return (
    <>
      <VoteContainer
        className={votesClass(upvoted)}
        onClick={voteRequest("upvote")}
      >
        <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
        {upvotedCount}
      </VoteContainer>
      <VoteContainer
        className={votesClass(downvoted)}
        onClick={voteRequest("downvote")}
      >
        <i className="fal fa-thumbs-down mr-1" title="Upvotes" />
        {downvoteCount}
      </VoteContainer>
    </>
  );
}
