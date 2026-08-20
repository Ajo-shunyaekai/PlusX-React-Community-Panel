import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./sidenavbar.module.css";
import CompanyLogo from "../CompanyLogo";
import SideBarLinkItem from "./SideBarLinkItem";
import SidebarDropdown from "./SidebarDropdown/SidebarDropdown";
import { menuItems } from "./DropdownMenu";

const SideNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [checkedItems, setCheckedItems] = useState({
        community: {
            residentList: false,
            chargerList: false,
            bookingList: false,
            invoiceList: false,
        },
    });
    const location = useLocation();

    const handleItemClicked = (menu, id, e) => {
        e.stopPropagation();
        setCheckedItems((prevState) => ({
            ...prevState,
            [menu]: {
                ...prevState[menu],
                [id]: true,
                ...Object.fromEntries(
                    Object.keys(prevState[menu]).map((key) =>
                        key !== id ? [key, false] : [key, true]
                    )
                ),
            },
        }));
    };

    useEffect(() => {
        const storedCheckedItems = sessionStorage.getItem("checkedItems");
        if (storedCheckedItems) {
            const parsedData = JSON.parse(storedCheckedItems);
            setCheckedItems(parsedData.checkedItems);
            setOpenDropdown(parsedData.dropdown);
        }
    }, []);

    useEffect(() => {
        const obj = {
            dropdown: openDropdown,
            checkedItems: checkedItems,
        };
        if (obj.dropdown) {
            sessionStorage.setItem("checkedItems", JSON.stringify(obj));
        }
    }, [checkedItems, openDropdown]);

    useEffect(() => {
        setCheckedItems((prevState) => ({
            community: location.pathname.includes("/community")
                ? prevState.community
                : { residentList: false, chargerList: false, bookingList: false, invoiceList: false },
        }));

        if (!location.pathname.includes("/community")) {
            sessionStorage.removeItem("checkedItems");
            setOpenDropdown(null);
        }
    }, [location]);

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const isActive = (route) => {
        if (route === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(route);
    };

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
            <div className={styles.hamburger} onClick={toggleSidebar}>
                {isSidebarOpen ? "✖" : "☰"}
            </div>
            <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.show : ""}`}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <CompanyLogo />
                    </NavLink>
                </div>
                <ul className={styles.menuList}>
                    <SideBarLinkItem label="Dashboard" path="/" isActive={isActive("/")} />
                    <SidebarDropdown
                        menuName="Community"
                        menuItems={menuItems.community}
                        openDropdown={openDropdown}
                        handleItemClick={(id, e) => handleItemClicked("community", id, e)}
                        toggleDropdown={toggleDropdown}
                        checkedItems={checkedItems.community}
                    />
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;
