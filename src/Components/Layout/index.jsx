import React, { useState } from "react";
import { EuiSideNav, EuiPageTemplate } from "@elastic/eui";
import {
  layout,
  sideNav,
  logoStyle,
  profileImage,
  profileImageContainer,
  line,
  headerStyle,
  headerInfoStyle,
  headerText
} from "./styles";
import logo from "../../assets/novek-logo.png";
import { AiFillBell } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const Layout = ({ header, children}) => {
  const [openSideNavInMobile, setOpenSideNavInMobile] = useState(false);

  const toggleNavInMobile = () => {
    setOpenSideNavInMobile(!openSideNavInMobile);
  };
  const sideBar = [
    {
      name: "Dashboard",
      id: "root",
      href: "/",
    },
    {
      name: "Charts",
      id: "charts",
      href: "/charts",
    },
  ];

  const sideNavigation = (
    <div>
      <img src={logo} alt="novek-logo" className={logoStyle} />
      <EuiSideNav
        // aria-label="Novek"
        // mobileTitle="Novek"
        toggleOpenOnMobile={() => toggleNavInMobile()}
        isOpenOnMobile={openSideNavInMobile}
        items={sideBar}
        className={sideNav}
      />
    </div>
  );

  return (
    <EuiPageTemplate
      SideBar={sideNavigation}
      restrictWidth="false"
      // pageSideBar={sideNavigation}
      Header={{ pageTitle: "Dashboard" }}
    >
      <EuiPageTemplate.Sidebar className={layout}>
        {sideNavigation}
      </EuiPageTemplate.Sidebar>

      <EuiPageTemplate.Header
      style={headerStyle}
      >
        <h1 className={headerText}>{header}</h1>
        <div className={headerInfoStyle}>
            <div>
            <BsSearch/>
            <AiFillBell/>
            </div>
          <div style={line}></div>
          <p>Hunter Achieng</p>
          <div style={profileImageContainer}>
            <img
              src="https://bit.ly/3D0sLGK"
              alt="profile"
              style={profileImage}
            />
          </div>
        </div>
      </EuiPageTemplate.Header>
      {children}
    </EuiPageTemplate>
  );
};

export default Layout;
