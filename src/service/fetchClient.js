const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("access_token");

export const fetchClient = async (endpoint, method = "GET", body = null, customHeaders = {}) => {
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

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Erreur du serveur");
    }

    return data;
};
