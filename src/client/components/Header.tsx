import getFormData from "get-form-data";
import styled from "styled-components/macro";
import { useHistory } from "client/helpers";
import { UserLogin } from "./UserLogin";
import React, {
  SyntheticEvent,
  useState,
  ChangeEvent,
  useEffect,
  FC,
} from "react";

const SearchIcon = styled.small.attrs({
  className: "fal fa-search mr-2",
})`
  position: absolute;
  pointer-events: none;
  right: 0;
`;

const SearchInput = styled.input.attrs({
  className: "form-control form-control-sm pr-4",
  name: "searchQuery",
  placeholder: "Search",
  "aria-label": "Search",
})``;

export const Header: FC = () => {
  const { location, navigate } = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const newQuery = location.pathname.includes("/search")
      ? (location.pathname.match(/^\/search\/(.*)/) || [])[1]
      : "";

    setSearchQuery(decodeURIComponent(newQuery));
  }, [location.pathname]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { searchQuery } = getFormData(e.target);
    navigate(searchQuery ? `/search/${searchQuery}` : "/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar navbar-light pr-0 mb-4">
      <ul className="ml-auto navbar-nav mr-3">
        <li className="nav-item">
          <UserLogin />
        </li>
      </ul>
      <form className="form-inline my-lg-0" onSubmit={handleSubmit}>
        <div className="position-relative d-flex align-items-center">
          <SearchInput value={searchQuery} onChange={handleChange} />
          <SearchIcon />
        </div>
      </form>
    </nav>
  );
};
