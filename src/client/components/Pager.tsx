import cx from "classnames";
import qs from "querystring";
import React, { FC, FunctionComponent } from "react";
import useLocation from "client/helpers/useLocation";
import { Link } from "@reach/router";

const createPages: CreatePages = (current, { range, total = 1 }) => {
  const pager = [];
  const start = 1;

  let i = Math.min(
    Math.max(total + start - range, 1),
    Math.max(start, current - ((range / 2) | 0))
  );

  const end = i + range > total ? total + 1 : i + range;

  while (i < end) {
    pager.push(
      <PageLink key={i} active={current === i} i={i}>
        {i}
      </PageLink>
    );
    i++;
  }

  return pager;
};

const PageLink: FunctionComponent<PageLinkProps> = props => {
  const { location } = useLocation();
  const { page, ...rest } = qs.parse(location.search.slice(1));

  // If we're going to the first page, just remove 'page' from the querystring
  const querystring = qs.encode(
    props.i === 1 ? rest : { ...rest, page: props.i }
  );

  return (
    <li
      className={cx("page-item", {
        active: props.active,
        disabled: props.disabled,
      })}
    >
      <Link className="page-link" to={"?" + querystring}>
        {props.children}
      </Link>
    </li>
  );
};

export const Pager: FC<Props> = props => {
  const page = Number(props.page);
  const { total } = props;
  const range = 5;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <PageLink disabled={page === 1} i={page - 1}>
          Previous
        </PageLink>
        {createPages(page, { range, total })}
        <PageLink disabled={page === total} i={page + 1}>
          Next
        </PageLink>
      </ul>
    </nav>
  );
};

type CreatePages = (
  current: number,
  options: { range: number; total: number }
) => Array<JSX.Element>;

type PageLinkProps = {
  active?: boolean;
  disabled?: boolean;
  i: number;
};

type Props = {
  page: number | string;
  total: number;
};
