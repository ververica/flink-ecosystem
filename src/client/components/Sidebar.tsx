import React, {
  useState,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
  useContext,
} from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import cx from "classnames";
import AnimateHeight from "react-animate-height";
import logo from "client/assets/flink-logo.png";

import { mediaLarge } from "client/helpers/styles";
import { UserData } from "./UserDataProvider";
import Icon from "./Icon";

const SidebarColumn = styled.div.attrs({
  className: "col-lg-3 order-first bg-light card",
})`
  border-radius: 0;
  border-top: 0;
  flex-grow: 0;

  /* subnav items */
  li li a {
    padding-left: 2.7em;
  }
`;

const FlinkLogo = styled.img.attrs({
  src: logo,
  alt: "Flink Logo",
})`
  height: 40px;
  object-fit: contain;

  @media ${mediaLarge} {
    height: auto;
    max-width: 100%;
    padding: 3rem 3rem 1rem;
  }
`;

const NavTitle = styled.h1`
  font-size: 1.25rem;
  display: inline;
  vertical-align: middle;
  margin-left: 15px;

  br {
    display: none;
  }

  @media ${mediaLarge} {
    display: block;
    text-align: center;
    margin-left: 0;
    margin-bottom: 1.5rem;

    br {
      display: block;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 50px;

  @media ${mediaLarge} {
    flex-direction: column;
    height: auto;

    .btn {
      display: none;
    }
  }
`;

const getRotation = (props: CaretProps) => (props.collapsed ? 0 : 540);

const Caret = styled.i.attrs({
  className: "fal fa-angle-down",
})<CaretProps>`
  transition: transform 350ms ease;
  transform: rotateZ(${getRotation}deg);
`;

const isActive = ({ isCurrent }: { isCurrent: boolean }) => {
  return { className: cx("nav-link", { active: isCurrent }) };
};

const NavItem: FunctionComponent<NavItemProps> = props => {
  return (
    <li className="nav-item">
      <Link to={props.to} getProps={isActive}>
        <Icon name={props.icon} />
        {props.children}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const [mainCollapsed, setMainCollapsed] = useState(true);
  const [subCollapsed, setSubCollapsed] = useState(false);

  const { user } = useContext(UserData);

  const toggleMain = (e: SyntheticEvent) => {
    e.preventDefault();
    setMainCollapsed(!mainCollapsed);
  };

  const toggleCategories = (e: SyntheticEvent) => {
    e.preventDefault();
    setSubCollapsed(!subCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const { matches } = window.matchMedia(mediaLarge);
      setMainCollapsed(!matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarColumn>
      <TitleContainer>
        <Link to="/" className="text-dark text-decoration-none">
          <FlinkLogo />

          <NavTitle>
            Apache Flink
            <br /> Community Packages
          </NavTitle>
        </Link>
        <button className="btn btn-light btn-sm" onClick={toggleMain}>
          <Icon name="bars" fw={false} margin={0} />
        </button>
      </TitleContainer>

      <AnimateHeight duration={350} height={mainCollapsed ? 0 : "auto"}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link d-flex justify-content-between align-items-center"
              href="#categories"
              onClick={toggleCategories}
            >
              <Icon name="tags" />
              <span className="mr-auto">Categories</span>
              <Caret collapsed={subCollapsed} />
            </a>
            <AnimateHeight duration={350} height={subCollapsed ? 0 : "auto"}>
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
          {/* <NavItem to="/guide" icon="books">
            Guide
          </NavItem> */}
          {user.id > 0 && (
            <>
              <li className="nav-item">
                <hr className="m-0" />
              </li>
              <NavItem to="/new-package" icon="plus">
                Add a Package
              </NavItem>
              <li className="nav-item">
                <hr className="m-0" />
              </li>
            </>
          )}

          <li className="nav-item mt-4">
            <a
              className="nav-link "
              href="https://flink.apache.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="external-link-square" />
              Apache Flink Website
            </a>
          </li>
        </ul>
      </AnimateHeight>
    </SidebarColumn>
  );
}

type CaretProps = {
  collapsed: boolean;
};

type IconProps = {
  icon: string;
};

type NavItemProps = {
  to: string;
  icon: string;
};
