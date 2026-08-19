import { motion } from "framer-motion";

export default function EndpointForm({
  form,
  editing,
  setForm,
  setEditing,
  saveEndpoint,
}) {
  function resetForm() {
    setEditing(null);

    setForm({
      endpointPath: "/api/users",
      jsonPayload: '{\n  "users": []\n}',
      description: "",
      statusCode: 200,
    });
  }

  return (
    <motion.form
      className="panel form-panel"
      onSubmit={saveEndpoint}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <div className="panel-title">
        <h2>
          {editing ? "Edit endpoint" : "Create endpoint"}
        </h2>

        {editing && (
          <button
            type="button"
            className="ghost"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>

      <label>
        Endpoint path

        <input
          value={form.endpointPath}
          onChange={(e) =>
            setForm({
              ...form,
              endpointPath: e.target.value,
            })
          }
          placeholder="/api/users"
          required
        />
      </label>

      <label>
        Description

        <input
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          placeholder="Example user list"
        />
      </label>

      <label>
        Status code

        <input
          type="number"
          min="100"
          max="599"
          value={form.statusCode}
          onChange={(e) =>
            setForm({
              ...form,
              statusCode: e.target.value,
            })
          }
        />
      </label>

      <label>
        JSON response

        <textarea
          rows="13"
          value={form.jsonPayload}
          onChange={(e) =>
            setForm({
              ...form,
              jsonPayload: e.target.value,
            })
          }
          spellCheck="false"
          required
        />
      </label>

      <button type="submit">
        {editing
          ? "Save changes"
          : "Create mock endpoint"}
      </button>
    </motion.form>
  );
}