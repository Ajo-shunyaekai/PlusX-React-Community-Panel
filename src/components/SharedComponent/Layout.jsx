import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import SideNavbar from "./SideNavBar/SideNavbar";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <SideNavbar />
      <div className={styles.mainPanel}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
