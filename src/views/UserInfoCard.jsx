import styles from "./addAffectation/AddAffectation.module.css"
const UserInfoCard = ({ user }) => {
    if (!user) return null;

    return (
        <div className={styles.card}>
            <p><strong>Nom :</strong> {user.nom}</p>
            <p><strong>CIN :</strong> {user.cin || "N/A"}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Téléphone :</strong> {user.telephone || "N/A"}</p>
        </div>
    );
};

export default UserInfoCard;
