import { motion } from "framer-motion";

export default function AuthPage({
  authMode,
  auth,
  error,
  loading,
  setAuthMode,
  setAuth,
  submitAuth,
}) {
  return (
    <main className="auth-shell">
      <motion.section
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="logo">DM</div>

        <h1>DevMock</h1>

        <p className="muted">
          Instant JSON APIs for frontend development.
        </p>

        <form onSubmit={submitAuth}>
          {authMode === "register" && (
            <input
              placeholder="Name"
              value={auth.name}
              onChange={(e) =>
                setAuth({
                  ...auth,
                  name: e.target.value,
                })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={auth.email}
            onChange={(e) =>
              setAuth({
                ...auth,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password (6+ characters)"
            value={auth.password}
            onChange={(e) =>
              setAuth({
                ...auth,
                password: e.target.value,
              })
            }
            required
          />

          {error && <div className="error">{error}</div>}

          <button disabled={loading}>
            {loading
              ? "Please wait..."
              : authMode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <button
          className="link-btn"
          onClick={() => {
            setAuthMode(
              authMode === "login"
                ? "register"
                : "login"
            );

            setAuth({
              name: "",
              email: "",
              password: "",
            });
          }}
        >
          {authMode === "login"
            ? "Create an account"
            : "Already have an account? Sign in"}
        </button>
      </motion.section>
    </main>
  );
}