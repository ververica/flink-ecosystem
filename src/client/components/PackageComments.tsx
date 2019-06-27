import React, { useContext } from "react";
import { UserData } from "./UserDataProvider";
import AddComment from "./AddComment";
import { PackageData, CommentData } from "client/types/Package";
import { RefreshData } from "client/helpers/useFetchData";
import Comment from "./Comment";

export default function PackageComments(props: PackageCommentsProps) {
  const { user } = useContext(UserData);
  const { pkg, comments } = props;
  return (
    <>
      {user.id > 0 && (
        <AddComment
          slug={pkg.slug}
          id={pkg.id}
          refreshPackageData={props.refreshPackageData}
        />
      )}
      {comments.length ? (
        comments.map(comment => <Comment {...comment} key={comment.id} />)
      ) : (
        <h3>No comments</h3>
      )}
    </>
  );
}

type PackageCommentsProps = {
  pkg: PackageData;
  comments: CommentData[];
  refreshPackageData: RefreshData;
};
