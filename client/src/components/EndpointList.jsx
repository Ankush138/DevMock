import EndpointCard from "./EndpointCard";

export default function EndpointList({
  endpoints,
  publicBase,
  setEditing,
  setForm,
  remove,
  openPlayground,
}) {
  return (
    <div className="panel">
      <div className="panel-title">
        <h2>Your endpoints</h2>

        <span className="muted">
          {endpoints.length} total
        </span>
      </div>

      {endpoints.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">{"{}"}</div>

          <h3>No endpoints yet</h3>

          <p>
            Create your first mock API on the left.
          </p>
        </div>
      ) : (
        <div className="endpoint-list">
          {endpoints.map((endpoint) => {
            const url =
              `${publicBase}${endpoint.endpointPath}`;

            return (
              <EndpointCard
                key={endpoint._id}
                endpoint={endpoint}
                url={url}
                setEditing={setEditing}
                setForm={setForm}
                remove={remove}
                openPlayground={openPlayground}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}