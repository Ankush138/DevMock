import { useState } from "react";
import { motion } from "framer-motion";

import DashboardHeader from "../components/DashboardHeader";
import DashboardHero from "../components/DashboardHero";
import EndpointForm from "../components/EndpointForm";
import EndpointList from "../components/EndpointList";
import ApiDocs from "../components/ApiDocs";
import ApiPlayground from "../components/ApiPlayground";

export default function Dashboard({
  user,
  endpoints,
  error,
  message,
  form,
  editing,
  publicBase,
  setForm,
  setEditing,
  saveEndpoint,
  remove,
  logout,
}) {
  const [playgroundEndpoint, setPlaygroundEndpoint] =
  useState(null);
  return (
    <div className="app">
     <DashboardHeader
  user={user}
  logout={logout}
/>

      <main className="container">
  <DashboardHero endpointCount={endpoints.length} />

        {(error || message) && (
          <div
            className={
              error
                ? "error banner"
                : "success banner"
            }
          >
            {error || message}
          </div>
        )}

        <section className="grid">
         <EndpointForm
  form={form}
  editing={editing}
  setForm={setForm}
  setEditing={setEditing}
  saveEndpoint={saveEndpoint}
/>

       <EndpointList
  endpoints={endpoints}
  publicBase={publicBase}
  setEditing={setEditing}
  setForm={setForm}
  remove={remove}
  openPlayground={setPlaygroundEndpoint}
/>
        </section>
        {playgroundEndpoint && (
  <ApiPlayground
    endpoint={playgroundEndpoint}
    url={`${publicBase}${playgroundEndpoint.endpointPath}`}
    onClose={() => setPlaygroundEndpoint(null)}
  />
)}

        <ApiDocs publicBase={publicBase} />
      </main>
    </div>
  );
}