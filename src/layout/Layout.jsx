import { useState } from "react";
import Backdrop from "../components/backdrop/Backdrop";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.css';

const Layout = () => {
    const [show, handleSetShow] = useState(false);

    return (
        <>
            <Navbar handleOpenSideBar={() => handleSetShow(true)} />
            <Sidebar showSideBar={show} handleCloseSideBar={() => handleSetShow(false)} />
            {show && <Backdrop />}
            <main className={styles['outlet-container']}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;