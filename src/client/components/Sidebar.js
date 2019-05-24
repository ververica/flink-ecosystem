import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import cx from "classnames";
import AnimateHeight from "react-animate-height";

import logo from "./flink-logo.png";

const SidebarColumn = styled.div.attrs({
  className: "col-md-3 bg-light card",
})`
  border-radius: 0;
  border-top: 0;
  /* border-bottom: 0; */
`;

const Caret = styled.i.attrs({
  className: "fal fa-angle-down",
})`
  transition: transform 350ms ease;
  transform: rotateZ(${props => (props.collapsed ? 0 : 540)}deg);
`;

const isActive = ({ className }) => ({ isCurrent }) => {
  return { className: cx(className, { active: isCurrent }) };
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    !window.location.pathname.startsWith("/categories")
  );

  const toggleCategories = e => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

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
          <a
            className="nav-link d-flex justify-content-between align-items-center"
            href="#categories"
            onClick={toggleCategories}
          >
            Categories
            <Caret collapsed={collapsed} />
          </a>
          <AnimateHeight duration={350} height={collapsed ? 0 : "auto"}>
            <ul className={cx("nav flex-column")}>
              <li className="nav-item">
                <Link
                  to="/categories/connectors"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  Connectors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/metrics"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  Metrics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/tools"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  Tools
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/machine-learning"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  Machine Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/languages"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  Languages
                </Link>
              </li>
            </ul>
          </AnimateHeight>
        </li>
        <li className="nav-item">
          <Link to="/guide" getProps={isActive({ className: "nav-link" })}>
            Guide
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            href="https://flink.apache.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache Flink
            <i className="fal fa-external-link-square ml-2" />
          </a>
        </li>
      </ul>
    </SidebarColumn>
  );
}
