export function normalizePath(value) {
  if (typeof value !== "string") throw new Error("Endpoint path is required");
  let path = value.trim();
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  if (path.includes("?") || path.includes("#") || path.includes("..")) {
    throw new Error("Invalid endpoint path");
  }
  if (!/^\/[A-Za-z0-9_./:-]*$/.test(path)) {
    throw new Error("Path contains unsupported characters");
  }
  return path;
}

export function parseJsonPayload(raw) {
  if (typeof raw === "object" && raw !== null) return raw;
  if (typeof raw !== "string") throw new Error("JSON payload is required");
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Payload must contain valid JSON");
  }
}
