import styles from "./InfoModal.module.css";

const InfoModal = ({ title, children, onClose }) => {
    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    {title}
                    <span className={styles.exit} onClick={onClose}>X</span>
                </div>
                <div className={styles["modal-content"]}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
