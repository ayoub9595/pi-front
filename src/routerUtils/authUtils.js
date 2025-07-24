import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("access_token");
            return false;
        }

        return true;
    } catch (error) {
        localStorage.removeItem("access_token");
        return false;
    }
};

export const getCurrentUserRole = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("access_token");
            return null;
        }

        return decoded?.role?.toUpperCase();
    } catch (error) {
        localStorage.removeItem("access_token");
        return null;
    }
};