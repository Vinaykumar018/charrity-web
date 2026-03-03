import React from "react";
import AdminLayout from "./AdminLayout";
import { api } from "../../../Api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = React.useState(null);
  const [monthly, setMonthly] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    async function load() {
      try {
        const [s, m] = await Promise.all([
          api.getAdminStats(),
          api.getMonthlyStats(),
        ]);
        setStats(s);
        setMonthly(m);
      } catch (e) {
        setErr(e.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function exportCSV() {
    window.open(`${api.baseURL}/admin/stats/monthly/export`, "_blank");
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-sm text-slate-500">Loading dashboard…</div>
      </AdminLayout>
    );
  }

  if (err) {
    return (
      <AdminLayout>
        <div className="p-6 text-sm text-red-600">{err}</div>
      </AdminLayout>
    );
  }

  const chartData = {
    labels: monthly.labels,
    datasets: [
      {
        label: "Blogs",
        data: monthly.blogs,
        backgroundColor: "#7c3aed",
      },
      {
        label: "Events",
        data: monthly.events,
        backgroundColor: "#0f766e",
      },
      {
        label: "Gallery",
        data: monthly.gallery,
        backgroundColor: "#f59e0b",
      },
    ],
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button
          onClick={exportCSV}
          className="text-xs bg-slate-800 text-white px-3 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Blogs" value={stats.blogs} />
        <StatCard title="Events" value={stats.events} />
        <StatCard title="Gallery Images" value={stats.gallery} />
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">
          Monthly Activity ({new Date().getFullYear()})
        </h3>
        <Bar data={chartData} height={100} />
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
