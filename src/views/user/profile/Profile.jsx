import styles from "./Profile.module.css";
import {useEffect, useState} from "react";
import {getUtilisateur, updateUtilisateur} from "../../../service/UtilisateurService.js";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import LoaderForButton from "../../../components/loaderForButton/LoaderForButton.jsx";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [showModify, setShowModify] = useState(false);
    const [loading, setLoading] = useState(false);
    const {id} = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUtilisateur(id);
                setUser(fetchedUser);
                setUserToUpdate(fetchedUser);
            }catch(err) {
                toast.error('Erreur de chargement de donnés de l\'utilisateur');
            }
        }
        fetchUser();
    },[id])

    const handleUserChange = e => {
        setUserToUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const successUser = await updateUtilisateur(userToUpdate);
            setUser(successUser);
            setShowModify(false);
            toast.success("Vos données ont été modifié avec succès")
            setLoading(false);
        }catch(err) {
            toast.error(err.message || "Erreur inattendue lors de l'ajout.",{duration: 2000});
        }
    }


    return (
        <>
            <h2>Information de l'utilisateur</h2>
            <div className={styles.container}>
                <div className={styles['user-infos']}>
                    <div className={styles['user-labels']}>
                        <span>Nom:</span>
                        <span>Cin:</span>
                        <span>Email:</span>
                        <span>Telephone:</span>
                        <span>Role:</span>
                    </div>
                    <div className={styles['user-data']}>
                        <span>{user ? user.nom : '-'}</span>
                        <span>{user ? user.cin : '-'}</span>
                        <span>{user ? user.email : '-'}</span>
                        <span>{user ? user.telephone : '-'}</span>
                        <span>{user ? user.role.toUpperCase()  :'-'}</span>
                    </div>
                </div>
                {!showModify && <button className={styles.button} onClick={() => setShowModify(true)}>Modifier</button>}
            </div>

            {showModify && <div className={styles['modification-section']}>
                <h2>Modifier utilisateur</h2>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <label>Nom:</label>
                    <input
                        className={styles.input}
                        name="nom"
                        defaultValue={userToUpdate ? userToUpdate.nom: ''}
                        onChange={handleUserChange}
                        required
                    />
                    <label>Cin:</label>
                    <input
                        className={styles.input}
                        name="cin"
                        defaultValue={userToUpdate ? userToUpdate.cin: ''}
                        onChange={handleUserChange}
                        required
                    />
                    <label>Email:</label>
                    <input
                        className={styles.input}
                        name="email"
                        defaultValue={userToUpdate ? userToUpdate.email: ''}
                        onChange={handleUserChange}
                        required
                    />
                    <label>Telephone:</label>
                    <input
                        className={styles.input}
                        name="telephone"
                        defaultValue={userToUpdate ? userToUpdate.telephone: ''}
                        onChange={handleUserChange}
                        required
                    />
                    <div className={styles['action-buttons']}>
                        <button className={styles.button} disabled={loading}>{loading ? <LoaderForButton /> :'Sauvegarder'}</button>
                        <button className={styles.button} disabled={loading} onClick={() => setShowModify(false)}>Annuler</button>
                    </div>
                </form>
            </div> }

        </>
    )
}

export default Profile;