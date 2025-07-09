import { useState } from "react";
import Backdrop from "../components/backdrop/Backdrop";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
const [show,handleSetShow] = useState(false)
return (
    <>
     <Navbar handleOpenSideBar={() => handleSetShow(true)}  />
     <Sidebar showSideBar={show} handleCloseSideBar={()=> handleSetShow(false)} />
     {show && <Backdrop/>}
    </>
)
}

export default Layout;