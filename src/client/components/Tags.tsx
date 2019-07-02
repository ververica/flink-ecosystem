import React from "react";
import { Link } from "@reach/router";

export default function Tags(props: TagsProps) {
  const { category } = props;
  return (
    <>
      <hr />
      <div className="row align-items-baseline">
        <div className="col">
          <span>Tags: </span>
          <big>
            <Link to={`/categories/${category}`} className="mr-2">
              <span className="badge badge-light">{category}</span>
            </Link>
            {props.tags
              .split(",")
              .map(tag => tag.trim())
              .filter(
                tag => tag.toLocaleLowerCase() !== category.toLocaleLowerCase()
              )
              .map((tag, i) => {
                const uriTag = encodeURIComponent(tag);
                return (
                  <Link to={`/search/${uriTag}`} key={i} className="mr-2">
                    <span className="badge badge-light">{tag}</span>
                  </Link>
                );
              })}
          </big>
        </div>
      </div>
    </>
  );
}

type TagsProps = {
  tags: string;
  category: string;
};
