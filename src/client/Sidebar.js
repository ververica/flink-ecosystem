import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import logo from "./flink-logo.png";

const SidebarColumn = styled.div.attrs({
  className: "col-md-3 bg-light card"
})`
  border-radius: 0;
  border-top: 0;
  /* border-bottom: 0; */
`;

export default function Sidebar() {
  return (
    <SidebarColumn>
      <Link to="/" className="text-dark text-decoration-none">
        <img src={logo} alt="Flink Logo" className="mw-100 px-5 pt-5 pb-3" />

        <h1 className="text-center h5 mb-4">
          Apache Flink
          <br /> Community Packages
        </h1>
      </Link>

      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active " href="#active">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#link">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#link">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link disabled"
            href="#disabled"
            tabIndex="-1"
            aria-disabled="true"
          >
            Disabled
          </a>
        </li>
      </ul>
    </SidebarColumn>
  );
}
