import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Card = styled.div.attrs({
  className: "card"
})`
  border-left: 0;
  border-radius: 0;
`;

const MainCard = props => (
  <Card>
    <div className="card-body">{props.children}</div>
  </Card>
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
          <nav className="navbar navbar-light">
            <a className="navbar-brand" href="#brand">
              Navbar
            </a>
          </nav>
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
