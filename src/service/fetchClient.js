import { store } from "../store/store.js";
import { logout } from "../store/authSlice.js";

const BASE_URL = "http://localhost:5000";

let globalNavigate = null;

export const setNavigateFunction = (navigate) => {
    globalNavigate = navigate;
};

const getToken = () => localStorage.getItem("access_token");

const handleTokenExpiration = () => {
    localStorage.clear();
    store.dispatch(logout());

    if (globalNavigate) {
        globalNavigate("/", { replace: true });
    } else {
        window.location.href = "/";
    }
};

const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) throw new Error("Aucun token de rafraîchissement");

    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${refresh_token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Échec du rafraîchissement du token");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
};

export const fetchClient = async (
    endpoint,
    method = "GET",
    body = null,
    customHeaders = {}
) => {
    let token = getToken();

    let headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
    };

    let config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

    try {
        let response = await fetch(url, config);

        if (response.status === 401) {

            try {
                const newToken = await refreshAccessToken();
                localStorage.setItem("access_token", newToken);
                headers.Authorization = `Bearer ${newToken}`;
                config.headers = headers;
                response = await fetch(url, config);
            } catch (refreshError) {
                handleTokenExpiration();
                throw new Error("Session expirée. Veuillez vous reconnecter.");
            }
        }

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const message =
                data?.msg || data?.error || data?.message || "Erreur serveur";
            throw new Error(message);
        }

        return data;
    } catch (error) {
        console.error("Erreur fetchClient:", error);
        throw error;
    }
};
