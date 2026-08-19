import React, { useEffect, useMemo, useState } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const empty = { endpointPath: "/api/users", jsonPayload: '{\n  "users": []\n}', description: "", statusCode: 200 };

async function request(path, options = {}) {
  const token = localStorage.getItem("devmock_token");
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("devmock_user") || "null"));
  const [authMode, setAuthMode] = useState("login");
  const [auth, setAuth] = useState({ name: "", email: "", password: "" });
  const [endpoints, setEndpoints] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const publicBase = useMemo(() => `${API}/mock/${user?.id || ""}`, [user]);

  async function loadEndpoints() {
    try {
      const data = await request("/api/endpoints");
      setEndpoints(data.endpoints);
    } catch (e) { setError(e.message); }
  }

  useEffect(() => { if (user) loadEndpoints(); }, [user]);

  async function submitAuth(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const data = await request(`/api/auth/${authMode}`, { method: "POST", body: JSON.stringify(auth) });
      localStorage.setItem("devmock_token", data.token);
      localStorage.setItem("devmock_user", JSON.stringify(data.user));
      setUser(data.user); setAuth({ name: "", email: "", password: "" });
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  function logout() {
    localStorage.removeItem("devmock_token");
    localStorage.removeItem("devmock_user");
    setUser(null);
  }

  async function saveEndpoint(e) {
    e.preventDefault(); setError(""); setMessage("");
    try {
      JSON.parse(form.jsonPayload);
      const payload = { ...form, statusCode: Number(form.statusCode) };
      if (editing) {
        await request(`/api/endpoints/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
        setMessage("Endpoint updated.");
      } else {
        await request("/api/endpoints", { method: "POST", body: JSON.stringify(payload) });
        setMessage("Endpoint created.");
      }
      setForm(empty); setEditing(null); loadEndpoints();
    } catch (e) { setError(e.message); }
  }

  async function remove(id) {
    if (!confirm("Delete this mock endpoint?")) return;
    try { await request(`/api/endpoints/${id}`, { method: "DELETE" }); loadEndpoints(); }
    catch (e) { setError(e.message); }
  }

  if (!user) {
  return (
    <AuthPage
      authMode={authMode}
      auth={auth}
      error={error}
      loading={loading}
      setAuthMode={setAuthMode}
      setAuth={setAuth}
      submitAuth={submitAuth}
    />
  );
}
  return (
  <Dashboard
    user={user}
    endpoints={endpoints}
    error={error}
    message={message}
    form={form}
    editing={editing}
    publicBase={publicBase}
    setForm={setForm}
    setEditing={setEditing}
    saveEndpoint={saveEndpoint}
    remove={remove}
    logout={logout}
  />
);
}
