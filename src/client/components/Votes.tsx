import React, {
  useState,
  SyntheticEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import cx from "classnames";
import Icon from "./Icon";

const VoteContainer = styled.small.attrs<VoteContainerProps>(props => ({
  className: cx("mr-4", { "text-muted": !props.voted }),
}))<VoteContainerProps>`
  cursor: pointer;
`;

const useVotes: UseVotes = ({ vote, upvotes, downvotes }) => {
  const [voteState, setVoteState] = useState({ vote, upvotes, downvotes });
  useEffect(() => {
    setVoteState({ vote, upvotes, downvotes });
  }, [vote, downvotes, upvotes]);

  return [voteState, setVoteState];
};

export default function Votes(props: Props) {
  const [{ vote, upvotes, downvotes }, setVoteState] = useVotes(props);

  const castVote: CastVote = (currentVote, change) => async e => {
    e.preventDefault();
    const newVote = currentVote !== change ? change : 0;
    try {
      const results: Votes = await fetch(`/api/v1/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: props.slug, id: props.id, vote: newVote }),
      }).then(r => {
        if (r.ok) return r.json();
        else throw r;
      });
      setVoteState(results);
    } catch (e) {}
  };

  return (
    <>
      <VoteContainer voted={vote > 0} onClick={castVote(vote, 1)}>
        <Icon name="thumbs-up" margin={1} title="Upvotes" />
        {upvotes}
      </VoteContainer>
      <VoteContainer voted={vote < 0} onClick={castVote(vote, -1)}>
        <Icon name="thumbs-down" margin={1} title="Downvotes" />
        {downvotes}
      </VoteContainer>
    </>
  );
}

type Props = {
  id: number;
  slug: string;
} & Votes;

type CastVote = (
  currentVote: number,
  change: number
) => (e: SyntheticEvent) => void;

type VoteContainerProps = {
  voted: boolean;
};

type Votes = {
  downvotes: number;
  upvotes: number;
  vote: number;
};

type UseVotes = (v: Votes) => [Votes, Dispatch<SetStateAction<Votes>>];
