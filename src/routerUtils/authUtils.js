import { jwtDecode } from "jwt-decode";

export function getCurrentUserRole() {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role?.toUpperCase() || null;
    } catch {
        return null;
    }
}

export function isLoggedIn() {
    return !!localStorage.getItem("access_token");
}
