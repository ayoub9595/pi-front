import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Sidebar.module.css";

const Sidebar = ({ showSideBar, handleCloseSideBar }) => {
    const role = useSelector((state) => state.auth.role);

    return (
        <div
            className={`
                ${styles.sidebar} 
                ${showSideBar ? styles["show-sidebar"] : ""} 
                ${role === "ADMIN" ? styles.admin : ""} 
                ${role === "UTILISATEUR" ? styles.utilisateur : ""}
            `}
        >
            <button onClick={handleCloseSideBar} className={styles["exit-button"]}>×</button>
            <nav
                className={`
                    ${styles.nav} 
                    ${role === "ADMIN" ? styles["admin-nav"] : ""} 
                    ${role === "UTILISATEUR" ? styles["utilisateur-nav"] : ""}
                `}
            >
                {role === "ADMIN" && (
                    <>
                        <Link to="/home" className={styles["admin-link"]}>➕ Ajouter équipement</Link>
                        <div className={styles["section-divider"]}></div>
                        <Link to="/home/equipements" className={`${styles["list-equipments-link"]} ${styles["admin-link"]}`}>
                            Liste des équipements
                        </Link>
                    </>
                )}
                {role === "UTILISATEUR" && (
                    <Link to="/home/dashboard" className={styles["utilisateur-link"]}>📊 Tableau de bord</Link>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
