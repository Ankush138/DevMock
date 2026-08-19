import { motion } from "framer-motion";

export default function ApiDocs({ publicBase }) {
  const exampleUrl = `${publicBase}/api/users`;

  return (
    <motion.section
      className="panel docs"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
    >
      <h2>How to consume a mock</h2>

      <p>
        Use the generated URL from any frontend application.
      </p>

      <pre>{`fetch("${exampleUrl}")
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>

      <p className="muted">
        DevMock returns <code>application/json</code> with
        the status code configured for the endpoint.
      </p>
    </motion.section>
  );
}