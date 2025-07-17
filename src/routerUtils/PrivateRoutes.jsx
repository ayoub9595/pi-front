import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUserRole } from "./authUtils";

const PrivateRoute = ({ children, requiredRole }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/" />;
    }

    if (requiredRole) {
        const role = getCurrentUserRole();
        if (role !== requiredRole.toUpperCase()) {
            return <Navigate to="/home/dashboard" />;
        }
    }

    return children;
};

export default PrivateRoute;
