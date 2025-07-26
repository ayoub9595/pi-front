import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUserRole } from "./authUtils";

const PrivateRoute = ({ children, requiredRole, useAccessDenied = false }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole) {
        const role = getCurrentUserRole();
        if (!role || role !== requiredRole.toUpperCase()) {
            if (useAccessDenied) {
                return <Navigate to="/access-denied" replace />;
            }

            if (role === "ADMIN") {
                return <Navigate to="/home/equipements" replace />;
            } else if (role === "UTILISATEUR") {
                return <Navigate to="/home/affectations" replace />;
            } else {
                return <Navigate to="/" replace />;
            }
        }
    }

    return children;
};

export default PrivateRoute;