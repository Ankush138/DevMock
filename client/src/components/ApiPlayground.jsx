import { useState } from "react";
import { motion } from "framer-motion";

export default function ApiPlayground({
  endpoint,
  url,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  async function sendRequest() {
    setLoading(true);
    setError("");
    setResponse(null);

    const start = performance.now();

    try {
      const res = await fetch(url);

      const duration = Math.round(
        performance.now() - start
      );

      const contentType =
        res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        duration,
        data,
      });
    } catch (err) {
      setError(
        err.message || "Unable to reach endpoint."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section
      className="playground"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="playground-header">
        <div>
          <p className="eyebrow">
            API PLAYGROUND
          </p>

          <h2>
            Test your mock endpoint
          </h2>
        </div>

        <button
          type="button"
          className="ghost"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="playground-endpoint">
        <span className="method method-get">
          GET
        </span>

        <code>{endpoint.endpointPath}</code>

        <span
          className={
            endpoint.statusCode >= 200 &&
            endpoint.statusCode < 300
              ? "status status-success"
              : "status status-other"
          }
        >
          {endpoint.statusCode}
        </span>
      </div>

      <div className="playground-section">
        <div className="playground-label">
          Request URL
        </div>

        <div className="playground-url">
          <code>{url}</code>
        </div>
      </div>

      <div className="playground-actions">
        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send request"}
        </button>
      </div>

      {error && (
        <div className="error playground-error">
          {error}
        </div>
      )}

      {response && (
        <motion.div
          className="playground-response"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="response-header">
            <div>
              <span className="playground-label">
                Response
              </span>

              <span
                className={
                  response.status >= 200 &&
                  response.status < 300
                    ? "status status-success"
                    : "status status-other"
                }
              >
                {response.status}{" "}
                {response.statusText}
              </span>
            </div>

            <span className="response-time">
              {response.duration} ms
            </span>
          </div>

          <pre>
            {typeof response.data === "string"
              ? response.data
              : JSON.stringify(
                  response.data,
                  null,
                  2
                )}
          </pre>
        </motion.div>
      )}
    </motion.section>
  );
}