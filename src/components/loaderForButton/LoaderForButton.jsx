import styles from "./LoaderForButtton.module.css"
const LoaderForButton = () => {
    return (
        <div className={styles['bar-loader']}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    )
}

export default LoaderForButton;