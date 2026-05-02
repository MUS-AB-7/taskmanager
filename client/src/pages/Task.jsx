import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { isAdmin } from "../utils/auth";

const statusOptions = ["TODO", "IN_PROGRESS", "DONE"];

const statusLabels = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    userId: "",
    projectId: "",
  });

  const canManage = isAdmin();

  const overdueCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.filter((task) => task.deadline && task.deadline < today && task.status !== "DONE").length;
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Could not load tasks.");
    }
  };

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data)).catch(() => setError("Could not load tasks."));
    API.get("/projects").then((res) => setProjects(res.data)).catch(() => {});

    if (canManage) {
      API.get("/users").then((res) => setUsers(res.data)).catch(() => {});
    }
  }, [canManage]);

  const createTask = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await API.post("/tasks", {
        ...form,
        userId: Number(form.userId),
        projectId: Number(form.projectId),
        deadline: form.deadline || null,
      });
      setForm({ title: "", description: "", deadline: "", userId: "", projectId: "" });
      loadTasks();
    } catch {
      setError("Only admins can create tasks. Check all fields and try again.");
    }
  };

  const updateStatus = async (taskId, status) => {
    setError("");

    try {
      await API.put(`/tasks/${taskId}?status=${status}`);
      loadTasks();
    } catch {
      setError("Could not update task status.");
    }
  };

  return (
    <Layout title="Tasks" subtitle={`${tasks.length} tasks tracked | ${overdueCount} overdue`}>
      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {canManage && (
        <form onSubmit={createTask} className="mb-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:grid-cols-2">
          <input
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            value={form.projectId}
            onChange={(e) => setForm({ ...form, projectId: e.target.value })}
            required
          >
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            required
          >
            <option value="">Assign user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
            ))}
          </select>
          <textarea
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 lg:col-span-2"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 lg:col-span-2">
            Add Task
          </button>
        </form>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          <span className="col-span-2">Task</span>
          <span>Project</span>
          <span>Assignee</span>
          <span>Status</span>
        </div>

        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-1 gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <h2 className="font-medium text-slate-900">{task.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{task.description || "No description"}</p>
              {task.deadline && <p className="mt-1 text-xs text-slate-500">Due {task.deadline}</p>}
            </div>
            <p className="text-sm text-slate-700">{task.project?.name || "-"}</p>
            <p className="text-sm text-slate-700">{task.assignedTo?.name || "-"}</p>
            <select
              className="h-10 rounded-md border border-slate-300 px-2 text-sm outline-none focus:border-slate-900"
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{statusLabels[status]}</option>
              ))}
            </select>
          </div>
        ))}

        {tasks.length === 0 && <p className="p-4 text-sm text-slate-600">No tasks yet.</p>}
      </div>
    </Layout>
  );
}
