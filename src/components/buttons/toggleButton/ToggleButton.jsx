import styles from './ToggleButton.module.css'
const ToggleButton = ({handleOpenSideBar}) => {
  return (
    <button onClick={handleOpenSideBar} className={styles["toggle-button"]}>
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 1024 1024"
        className="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64 192h896v76.8H64V192z m0 281.6h896v76.8H64V473.6z m0 281.6h896V832H64v-76.8z"
          fill="#000000"
        />
      </svg>
    </button>
  );
};
export default ToggleButton;
