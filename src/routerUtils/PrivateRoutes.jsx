import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUserRole } from "./authUtils";

const PrivateRoute = ({ children, requiredRole }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole) {
        const role = getCurrentUserRole();
        if (!role || role !== requiredRole.toUpperCase()) {
            if (role === "ADMIN") {
                return <Navigate to="/home/equipements" replace />;
            } else if (role === "UTILISATEUR") {
                return <Navigate to="/home/dashboard" replace />;
            } else {
                return <Navigate to="/" replace />;
            }
        }
    }

    return children;
};

export default PrivateRoute;