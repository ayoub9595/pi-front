import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUserRole } from "./authUtils";

const PublicRoute = ({ children }) => {
    if (isLoggedIn()) {
        const role = getCurrentUserRole();

        if (role === "ADMIN") {
            return <Navigate to="/home/equipements" replace />;
        } else if (role === "UTILISATEUR") {
            return <Navigate to="/home/dashboard" replace />;
        } else {
            localStorage.removeItem("access_token");
            return children;
        }
    }

    return children;
};

export default PublicRoute;