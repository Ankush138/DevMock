import { motion } from "framer-motion";

export default function StatCard({
  label,
  value,
  description,
  icon,
}) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>

        {icon && (
          <span className="stat-icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="stat-value">{value}</div>

      {description && (
        <div className="stat-description">
          {description}
        </div>
      )}
    </motion.div>
  );
}