import { useState } from "react";
import { motion } from "framer-motion";

export default function EndpointCard({
  endpoint,
  url,
  setEditing,
  setForm,
  remove,
  openPlayground,
}) {
  const [copied, setCopied] = useState(false);

  function editEndpoint() {
    setEditing(endpoint._id);

    setForm({
      endpointPath: endpoint.endpointPath,
      jsonPayload: JSON.stringify(
        endpoint.jsonPayload,
        null,
        2
      ),
      description: endpoint.description,
      statusCode: endpoint.statusCode,
    });
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      console.error("Unable to copy URL");
    }
  }

  return (
    <article className="endpoint">
      <div className="endpoint-top">
        <div className="endpoint-identity">
          <span className="method method-get">
            GET
          </span>

          <code>{endpoint.endpointPath}</code>
        </div>

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

      <p className="endpoint-description">
        {endpoint.description || "No description provided"}
      </p>

      <div className="endpoint-url-row">
        <code className="endpoint-url">
          {url}
        </code>

        <button
          type="button"
          className="copy-button"
          onClick={copyUrl}
        >
          {copied ? "Copied ✓" : "Copy URL"}
        </button>
      </div>

      <div className="endpoint-bottom">
        <span className="request-count">
          {endpoint.requestCount || 0} requests
        </span>

        <div className="endpoint-actions">
          <motion.button
  type="button"
  className="small"
  onClick={() => openPlayground(endpoint)}
  whileTap={{ scale: 0.96 }}
>
  Test
</motion.button>

          <motion.button
            type="button"
            className="small"
            onClick={editEndpoint}
            whileTap={{ scale: 0.96 }}
          >
            Edit
          </motion.button>

          <motion.button
            type="button"
            className="small danger"
            onClick={() => remove(endpoint._id)}
            whileTap={{ scale: 0.96 }}
          >
            Delete
          </motion.button>
        </div>
      </div>
    </article>
  );
}