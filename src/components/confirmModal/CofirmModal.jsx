import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({message,handleConfirm,handleCancel}) => {
    return (
        <>
            <div className={styles['modal-overlay']}>
                <div className={styles.modal}>
                    <p>{message}</p>
                    <div className={styles['modal-actions']}>
                        <button onClick={handleConfirm} className={styles['confirm-button']}>Oui</button>
                        <button onClick={handleCancel} className={styles['cancel-button']}>Non</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmModal;