// src/admin/EmptyPage.jsx
import React from "react";
import AdminLayout from "./AdminLayout";

export default function EmptyPage() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6 min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-2">Empty Page</h2>
        <p className="text-sm text-slate-500">Use this blank canvas to create new admin screens.</p>
      </div>
    </AdminLayout>
  );
}
