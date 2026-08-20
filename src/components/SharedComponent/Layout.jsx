import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import SideNavbar from "./SideNavBar/SideNavbar";
import styles from "./Layout.module.css";
import { isAuthenticated } from "../../utils/authStorage";

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

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
