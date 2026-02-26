const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export const vehiclesApi = {
  list: () => http("/api/vehicles"),
  getById: (id) => http(`/api/vehicles/${id}`),
  create: (dto) => http("/api/vehicles", { method: "POST", body: JSON.stringify(dto) }),
  update: (id, dto) => http(`/api/vehicles/${id}`, { method: "PUT", body: JSON.stringify(dto) }),
  remove: (id) => http(`/api/vehicles/${id}`, { method: "DELETE" }),
};