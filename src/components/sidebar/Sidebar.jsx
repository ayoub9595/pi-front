import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice.js"; // Adjust the path as needed
import styles from "./Sidebar.module.css";
import { navigationData } from "../../utils/NavigationData.js";

const Sidebar = ({ showSideBar, handleCloseSideBar }) => {
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openSections, setOpenSections] = useState({
        equipement: false,
        affectation: false
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        navigate("/", { replace: true });
        handleCloseSideBar(); // Close sidebar after logout
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


    const renderNavigationItem = (item, index, isLast) => {
        const { id, title, icon, isToggleable, subLinks, to } = item;

        return (
            <div key={id} className={styles["section"]}>
                {isToggleable ? (
                    <>
                        <button
                            className={styles["section-toggle"]}
                            onClick={() => toggleSection(id)}
                        >
                            <span className={styles["section-icon"]}>{icon}</span>
                            <span>{title}</span>
                            <span className={`${styles["toggle-arrow"]} ${openSections[id] ? styles["toggle-arrow-open"] : ""}`}>
                                ▼
                            </span>
                        </button>
                        <div className={`${styles["section-content"]} ${openSections[id] ? styles["section-content-open"] : ""}`}>
                            {subLinks.map((subLink, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subLink.to}
                                    className={`${styles["admin-link"]} ${styles["sub-link"]}`}
                                    onClick={(e) => {
                                        if (subLink.label === "Se deconnecter") {
                                            e.preventDefault();
                                            handleLogout();
                                        } else {
                                            handleCloseSideBar();
                                        }
                                    }}
                                >
                                    {subLink.icon} {subLink.label}
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <Link
                        to={to}
                        className={styles[role === "ADMIN" ? "admin-link" : "utilisateur-link"]}
                        onClick={handleCloseSideBar}
                    >
                        {icon} {title}
                    </Link>
                )}
                {!isLast && <div className={styles["section-divider"]}></div>}
            </div>
        );
    };

    const getNavigationData = () => {
        const baseData = navigationData[role] || [];

        if (isMobile) {
            const userMenuItem = {
                id: "utilisateur",
                title: "Utilisateur",
                isToggleable: true,
                subLinks: [
                    { to: "/home/profile", label: "Profile" },
                    { to: "/home/change-password", label: "Changer mot de passe" },
                    { to: "#", label: "Se deconnecter" } // The 'to' doesn't matter since we handle it with onClick
                ]
            };

            return [userMenuItem, ...baseData];
        }

        return baseData;
    };

    return (
        <div
            className={`${styles.sidebar} ${
                showSideBar ? styles["show-sidebar"] : ""
            } ${role === "ADMIN" ? styles.admin : ""} ${
                role === "UTILISATEUR" ? styles.utilisateur : ""
            }`}
        >
            <button onClick={handleCloseSideBar} className={styles["exit-button"]}>
                ×
            </button>
            <nav
                className={`${styles.nav} ${
                    role === "ADMIN" ? styles["admin-nav"] : ""
                } ${role === "UTILISATEUR" ? styles["utilisateur-nav"] : ""}`}
            >
                {getNavigationData().map((item, index, array) =>
                    renderNavigationItem(item, index, index === array.length - 1)
                )}
            </nav>
        </div>
    );
};

export default Sidebar;