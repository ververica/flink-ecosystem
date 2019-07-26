import cx from "classnames";
import styled from "styled-components/macro";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../Icon";
import React, {
  useState,
  SyntheticEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from "react";
import { UncontrolledTooltip } from "reactstrap";
import { UserData } from "../UserDataProvider";

const VoteContainer = styled.small`
  cursor: ${(props: { loggedOut: boolean }) =>
    props.loggedOut ? "default" : "pointer"};

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
  const { user } = useContext(UserData);
  const [{ vote, upvotes, downvotes }, setVoteState] = useVotes(props);
  const loggedOut = user.id === 0;

  const castVote: CastVote = (currentVote, change) => async e => {
    e.preventDefault();
    if (loggedOut) return;

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
      <VoteContainer
        loggedOut={loggedOut}
        id="upvote"
        className={cx({ "text-muted": vote <= 0 })}
        onClick={castVote(vote, 1)}
      >
        <Icon icon={faThumbsUp} marginRight={1} title="thumbs up" />
        {upvotes}
      </VoteContainer>
      <VoteContainer
        loggedOut={loggedOut}
        id="downvote"
        className={cx({ "text-muted": vote >= 0 })}
        onClick={castVote(vote, -1)}
      >
        <Icon icon={faThumbsDown} marginRight={1} title="thumbs down" />
        {downvotes}
      </VoteContainer>
      {loggedOut && (
        <>
          <UncontrolledTooltip target="upvote" placement="top" offset="0, 5px">
            You must be logged in to upvote.
          </UncontrolledTooltip>

          <UncontrolledTooltip
            target="downvote"
            placement="top"
            offset="0, 5px"
          >
            You must be logged in to downvote.
          </UncontrolledTooltip>
        </>
      )}
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

type Votes = {
  downvotes: number;
  upvotes: number;
  vote: number;
};

type UseVotes = (v: Votes) => [Votes, Dispatch<SetStateAction<Votes>>];
