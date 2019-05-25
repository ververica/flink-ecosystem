import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import cx from "classnames";
import AnimateHeight from "react-animate-height";

import logo from "client/assets/flink-logo.png";

const SidebarColumn = styled.div.attrs({
  className: "col-md-3 bg-light card",
})`
  border-radius: 0;
  border-top: 0;
  /* border-bottom: 0; */
`;

const Caret = styled.i.attrs({
  className: "far fa-angle-down",
})`
  transition: transform 350ms ease;
  transform: rotateZ(${props => (props.collapsed ? 0 : 540)}deg);
`;

const isActive = ({ className }) => ({ isCurrent }) => {
  return { className: cx(className, { active: isCurrent }) };
};

export default function Sidebar(props) {
  // const isCategoryPage = window.location.pathname.startsWith("/categories");
  const [collapsed, setCollapsed] = useState(false);

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
        {props.userLogin && (
          <li className="nav-item">
            <Link
              to="/new-package"
              getProps={isActive({ className: "nav-link" })}
            >
              <i className="far fa-fw fa-plus mr-2" />
              Add a Package
            </Link>
            <hr className="m-0" />
          </li>
        )}

        <li className="nav-item">
          <a
            className="nav-link d-flex justify-content-between align-items-center"
            href="#categories"
            onClick={toggleCategories}
          >
            <i className="far fa-fw fa-tags mr-2" />
            <span className="mr-auto">Categories</span>
            <Caret collapsed={collapsed} />
          </a>
          <AnimateHeight duration={350} height={collapsed ? 0 : "auto"}>
            <ul className={cx("nav flex-column")}>
              <li className="nav-item">
                <Link
                  to="/categories/connectors"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  <i className="far fa-fw fa-plug mr-2" />
                  Connectors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/metrics"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  <i className="far fa-fw fa-tachometer-alt-fast mr-2" />
                  Metrics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/tools"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  <i className="far fa-fw fa-tools mr-2" />
                  Tools
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/machine-learning"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  <i className="far fa-fw fa-chart-network mr-2" />
                  Machine Learning
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/categories/languages"
                  getProps={isActive({ className: "nav-link pl-5" })}
                >
                  <i className="far fa-fw fa-language mr-2" />
                  Languages
                </Link>
              </li>
            </ul>
          </AnimateHeight>
        </li>
        <li className="nav-item">
          <Link to="/guide" getProps={isActive({ className: "nav-link" })}>
            <i className="far fa-fw fa-books mr-2" />
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
            <i className="far fa-fw fa-external-link-square mr-2" />
            Apache Flink
          </a>
        </li>
      </ul>
    </SidebarColumn>
  );
}
