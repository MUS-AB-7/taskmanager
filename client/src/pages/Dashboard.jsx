import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(() => setError("Could not load dashboard data."));
  }, []);

  return (
    <Layout title="Dashboard" subtitle="Quick view of task progress and overdue work.">
      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Tasks" value={data.totalTasks} />
        <StatCard label="Completed" value={data.completedTasks} tone="green" />
        <StatCard label="Pending" value={data.pendingTasks} tone="amber" />
        <StatCard label="Overdue" value={data.overdueTasks} tone="red" />
      </div>
    </Layout>
  );
}
