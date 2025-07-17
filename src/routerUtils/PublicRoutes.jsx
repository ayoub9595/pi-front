import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const role = decoded?.role?.toUpperCase();

            if (role === "ADMIN") {
                return <Navigate to="/home/equipements" replace />;
            } else {
                return <Navigate to="/home/dashboard" replace />;
            }
        } catch (error) {
            localStorage.removeItem("access_token");
        }
    }
    return children;
};

export default PublicRoute;
