import { motion } from "framer-motion";

export default function DashboardHero({ endpointCount }) {
  return (
    <motion.section
      className="workspace-heading"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="workspace-breadcrumb">
          Workspace <span>/</span> Mocks
        </div>

        <h1>Mocks</h1>

        <p>
          Create lightweight APIs for frontend development.
        </p>
      </div>

      <motion.div
        className="workspace-count"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <strong>{endpointCount}</strong>
        <span>endpoint{endpointCount === 1 ? "" : "s"}</span>
      </motion.div>
    </motion.section>
  );
}