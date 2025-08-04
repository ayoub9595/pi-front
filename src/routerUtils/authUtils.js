import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {

    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    return !!(token || refreshToken);

};

export const getCurrentUserRole = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded?.role?.toUpperCase();
    } catch (error) {
        localStorage.removeItem("access_token");
        return null;
    }
};