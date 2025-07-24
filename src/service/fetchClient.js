const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("access_token");

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
