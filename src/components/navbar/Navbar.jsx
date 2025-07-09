import styles from "./Navbar.module.css";
import ToggleButton from "../buttons/toggleButton/ToggleButton";
import ProfileButton from "../buttons/profileButton/ProfileButton";
import NotificationButton from "../buttons/notificationButton/NotificationButton";
const Navbar = ({ handleOpenSideBar }) => {
  return (
    <div className={styles.nav}>
      <div className={styles["nav-right"]}>
        <ToggleButton handleOpenSideBar={handleOpenSideBar} />
        <img
          className={styles.logo}
          src="https://avatars.githubusercontent.com/u/2487851?s=280&v=4"
          height="50px"
          width="50px"
        />
        <span className={styles.label}>Parc Informatique</span>
      </div>
      <div className={styles["nav-left"]}>
        <NotificationButton />
        <ProfileButton />
      </div>
    </div>
  );
};
export default Navbar;
