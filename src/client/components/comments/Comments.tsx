import Comment from "./Comment";
import React, { FC, useContext, useState } from "react";
import { AddComment } from "./AddComment";
import { CommentData, PackageData } from "client/types/Package";
import { UserData } from "client/components/UserDataProvider";

export const Comments: FC<Props> = props => {
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
        <AddComment
          addComment={addComment}
          id={pkg.id}
          packageName={pkg.name}
          packageSlug={pkg.slug}
        />
      )}
    </>
  );
};

type Props = {
  pkg: PackageData;
  comments: CommentData[];
};
