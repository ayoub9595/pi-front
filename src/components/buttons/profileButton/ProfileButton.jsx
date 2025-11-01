import styles from './ProfileButton.module.css'
import ProfileIcon from "../../icons/ProfileIcon.jsx";
import DetailsIcon from "../../icons/DetailsIcon.jsx";
import ChangeIcon from "../../icons/ChangeIcon.jsx";
import LogoutIcon from "../../icons/LogoutIcon.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/authSlice.js";
import {useNavigate} from "react-router-dom";


const ProfileButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { nom, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout())
        navigate("/",{replace: true});
    }

    return (
        <div className={styles['profile-container']}>
            <button className={styles['profile-button']}>
                <ProfileIcon />
            </button>

            <div className={styles['dropdown-menu']}>
                <div className={styles['dropdown-item']} onClick={() => navigate("/home/profile")}>
                    <DetailsIcon />
                    <div className={styles['profile-info']}>
                        <span className={styles['user-name']}>{nom || 'Utilisateur'}</span>
                        <span className={`${styles['role-badge']} ${styles[role?.toLowerCase()]}`}>
                            {role === 'ADMIN' ? 'Admin' : 'Utilisateur'}
                        </span>
                    </div>
                </div>

                <div className={styles['dropdown-item']} onClick={() => navigate("/home/change-password")}>
                    <ChangeIcon />
                    Changer mot de passe
                </div>
                <div className={styles['dropdown-item']} onClick={handleLogout}>
                    <LogoutIcon />
                    Se deconnecter
                </div>
            </div>
        </div>
    );
};

export default ProfileButton;