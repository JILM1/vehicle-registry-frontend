const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });


    if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Error en la solicitud");
    }

    return res.json();
}

    export const vehiclesApi = {
        list : () => http("/api/vehicles"),
        getById : (id) => http(`/api/vehicles/${id}`),
        create : (data) => http("/api/vehicles", { method: "POST", body: JSON.stringify(data) }),
        update : (id, data) => http(`/api/vehicles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        delete : (id) => http(`/api/vehicles/${id}`, { method: "DELETE" }),
    };