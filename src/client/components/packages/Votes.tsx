import React, {
  useState,
  SyntheticEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import styled from "styled-components/macro";
import cx from "classnames";
import { Icon } from "../Icon";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const VoteContainer = styled.small.attrs<VoteContainerProps>(props => ({
  className: cx({ "text-muted": !props.voted }),
}))<VoteContainerProps>`
  cursor: pointer;
  & + & {
    margin-left: 24px;
  }
`;

const useVotes: UseVotes = ({ vote, upvotes, downvotes }) => {
  const [voteState, setVoteState] = useState({ vote, upvotes, downvotes });
  useEffect(() => {
    setVoteState({ vote, upvotes, downvotes });
  }, [vote, downvotes, upvotes]);

  return [voteState, setVoteState];
};

export const Votes: FC<Props> = props => {
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
        <Icon icon={faThumbsUp} marginRight={1} title="thumbs up" />
        {upvotes}
      </VoteContainer>
      <VoteContainer voted={vote < 0} onClick={castVote(vote, -1)}>
        <Icon icon={faThumbsDown} marginRight={1} title="thumbs down" />
        {downvotes}
      </VoteContainer>
    </>
  );
};

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
