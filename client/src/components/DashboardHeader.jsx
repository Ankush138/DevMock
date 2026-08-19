import { motion } from "framer-motion";

export default function DashboardHeader({ user, logout }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="brand">
        <div className="brand-mark">D</div>

        <strong>DevMock</strong>

        <span className="header-divider" />

        <span className="workspace-label">
          Developer Workspace
        </span>
      </div>

      <div className="header-right">
        <div className="user-menu">
          <span className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>

          <span className="user-name">
            {user.name}
          </span>
        </div>

        <button
          className="ghost"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </motion.header>
  );
}