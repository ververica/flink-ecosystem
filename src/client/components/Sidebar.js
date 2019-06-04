import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import cx from "classnames";
import AnimateHeight from "react-animate-height";

import logo from "client/assets/flink-logo.png";
// import flinkIcon from "client/assets/flink-icon.svg";

const SidebarColumn = styled.div.attrs({
  className: "col-md-4 col-lg-3 order-first bg-light card",
})`
  border-radius: 0;
  border-top: 0;

  /* subnav items */
  li li a {
    padding-left: 2.7em;
  }

  @media screen and (max-width: 991px) and (min-width: 768px) {
    position: absolute;
  }
`;

const getRotation = props => (props.collapsed ? 0 : 540);

const Caret = styled.i.attrs({
  className: "fal fa-angle-down",
})`
  transition: transform 350ms ease;
  transform: rotateZ(${getRotation}deg);
`;

const isActive = ({ isCurrent }) => {
  return { className: cx("nav-link", { active: isCurrent }) };
};

const Icon = props => <i className={`fal fa-fw mr-2 fa-${props.icon}`} />;

const NavItem = props => {
  return (
    <li className="nav-item">
      <Link to={props.to} getProps={isActive}>
        <Icon icon={props.icon} />
        {props.children}
      </Link>
    </li>
  );
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
        <li className="nav-item">
          <a
            className="nav-link d-flex justify-content-between align-items-center"
            href="#categories"
            onClick={toggleCategories}
          >
            <Icon icon="tags" />
            <span className="mr-auto">Categories</span>
            <Caret collapsed={collapsed} />
          </a>
          <AnimateHeight duration={350} height={collapsed ? 0 : "auto"}>
            <ul className={cx("nav flex-column")}>
              <NavItem to="/categories/connectors" icon="plug">
                Connectors
              </NavItem>
              <NavItem to="/categories/metrics" icon="tachometer-alt-fast">
                Metrics
              </NavItem>
              <NavItem to="/categories/tools" icon="tools">
                Tools
              </NavItem>
              <NavItem to="/categories/machine-learning" icon="chart-network">
                Machine Learning
              </NavItem>
              <NavItem to="/categories/languages" icon="language">
                Languages
              </NavItem>
            </ul>
          </AnimateHeight>
        </li>
        <NavItem to="/guide" icon="books">
          Guide
        </NavItem>
        {props.userLogin && (
          <>
            <hr className="m-0" />
            <NavItem to="/new-package" icon="plus">
              Add a Package
            </NavItem>
            <hr className="m-0" />
          </>
        )}

        <li className="nav-item">
          <a
            className="nav-link "
            href="https://flink.apache.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src={flinkIcon} style={{ width: 20 }} className="mr-2" /> */}
            <Icon icon="external-link-square" />
            Apache Flink
          </a>
        </li>
      </ul>
    </SidebarColumn>
  );
}
