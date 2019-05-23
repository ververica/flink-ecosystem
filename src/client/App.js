import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const SearchIcon = styled.i.attrs({
  className: "fal fa-search position-absolute mr-2"
})`
  pointer-events: none;
  right: 0;
`;

const MainCard = props => (
  <div className="card border-left-0 rounded-0">
    <div className="card-body">{props.children}</div>
  </div>
);

const TopNav = props => (
  <nav className="navbar navbar-light pr-0 mb-4">
    <ul className="ml-auto navbar-nav mr-3">
      <li className="nav-item">
        <small>
          <a href="#login">Login With Github</a>
        </small>
      </li>
    </ul>
    <form className="form-inline my-lg-0">
      <div className="position-relative d-flex align-items-center">
        <input
          className="form-control form-control-sm pr-4 rounded-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <SearchIcon />
      </div>
    </form>
  </nav>
);

function App() {
  const [packages, setPackages] = useState({});
  useEffect(() => {
    fetch("/api/v1/packages")
      .then(r => r.json())
      .then(data => setPackages(data));
  }, []);

  return (
    <div className="container min-vh-100 d-flex flex-column">
      <div className="row no-gutters w-100 flex-grow-1">
        <Sidebar />
        <div className="col-md-9">
          <TopNav />
          <MainCard>
            <header className="App-header">
              <img className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </MainCard>
        </div>
      </div>
      <div className="row no-gutters text-center d-block">footer</div>
    </div>
  );
}

export default App;
