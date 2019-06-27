import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import AddComment from "./AddComment";
import { PackageData, CommentData } from "client/types/Package";
import Comment from "./Comment";

export default function PackageComments(props: PackageCommentsProps) {
  const { user } = useContext(UserData);
  const [comments, setComments] = useState(props.comments);

  const addComment = (comment: CommentData) => {
    setComments(c => [...c, comment]);
  };

  const { pkg } = props;
  return (
    <>
      {comments.length ? (
        comments.map(comment => <Comment {...comment} key={comment.id} />)
      ) : (
        <h3>No comments</h3>
      )}
      <hr />
      {user.id > 0 && (
        <AddComment slug={pkg.slug} id={pkg.id} addComment={addComment} />
      )}
    </>
  );
}

type PackageCommentsProps = {
  pkg: PackageData;
  comments: CommentData[];
};
