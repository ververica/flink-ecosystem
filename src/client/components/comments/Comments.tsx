import React, { useContext, useState, FC } from "react";
import { UserData } from "client/components/UserDataProvider";
import { PackageData, CommentData } from "client/types/Package";

import AddComment from "./AddComment";
import Comment from "./Comment";

export const Comments: FC<Comments> = props => {
  const { user } = useContext(UserData);
  const [comments, setComments] = useState(props.comments);

  const addComment = (comment: CommentData) => {
    setComments(c => [...c, comment]);
  };

  const removeComment = (id: CommentData["id"]) => {
    setComments(cs => cs.filter(c => c.id !== id));
  };

  const { pkg } = props;
  return (
    <>
      {comments.length ? (
        <ul className="list-unstyled">
          {comments.map(comment => (
            <Comment
              {...comment}
              key={comment.id}
              removeComment={removeComment}
            />
          ))}
        </ul>
      ) : null}

      {user.id > 0 && (
        <AddComment slug={pkg.slug} id={pkg.id} addComment={addComment} />
      )}
    </>
  );
};

type Comments = {
  pkg: PackageData;
  comments: CommentData[];
};
