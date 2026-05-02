import { useState, useEffect } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { isAdmin } from "../utils/auth";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const canManage = isAdmin();

  const load = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch {
      setError("Could not load projects.");
    }
  };

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Could not load projects."));
  }, []);

  const createProject = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await API.post("/projects", { name });
      setName("");
      load();
    } catch {
      setError("Only admins can create projects.");
    }
  };

  return (
    <Layout title="Projects" subtitle="Create projects and view who created them.">
      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {canManage && (
        <form onSubmit={createProject} className="mb-5 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row">
          <input
            className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800">
            Add Project
          </button>
        </form>
      )}

      <div className="grid gap-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">{project.name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              Created by {project.createdBy?.name || "Unknown"}
            </p>
          </div>
        ))}
        {projects.length === 0 && <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">No projects yet.</p>}
      </div>
    </Layout>
  );
}
