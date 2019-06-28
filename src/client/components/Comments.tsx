import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import AddComment from "./AddComment";
import { PackageData, CommentData } from "client/types/Package";
import Comment from "./Comment";

export default function PackageComments(props: CommentsProps) {
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
      ) : (
        <>
          <h3>No comments</h3>
          <hr />
        </>
      )}

      {user.id > 0 && (
        <AddComment slug={pkg.slug} id={pkg.id} addComment={addComment} />
      )}
    </>
  );
}

type CommentsProps = {
  pkg: PackageData;
  comments: CommentData[];
};
