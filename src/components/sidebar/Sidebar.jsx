import styles from './Sidebar.module.css'
const Sidebar = ({showSideBar,handleCloseSideBar}) => {
return (
    <div className={`${styles.sidebar} ${showSideBar ? styles['show-sidebar'] : ''}` }>
        <button onClick={handleCloseSideBar} className={styles['exit-button']}>X</button>
    </div>
)
}

export default Sidebar;