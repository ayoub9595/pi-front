import {store} from "../store/store.js";
import {logout} from "../store/authSlice.js";

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
        globalNavigate('/', { replace: true });
    } else {

        window.location.href = '/';
    }
};

export const fetchClient = async (
    endpoint,
    method = "GET",
    body = null,
    customHeaders = {}
) => {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
    };

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

    try {
        const response = await fetch(url, config);

        if (response.status === 401) {
            handleTokenExpiration();
            throw new Error("Session expired. Please login again.");
        }

        const contentType = response.headers.get("content-type");

        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const message = data?.msg || data?.error || data?.message || "Erreur serveur";
            throw new Error(message);
        }

        return data;
    } catch (error) {
        console.error("Erreur fetchClient:", error);
        throw error;
    }
};
