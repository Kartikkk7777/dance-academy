"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, Clock, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED"];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  async function fetchStudents() {
    setLoading(true);
    try {
      let url = `/api/admin/students?page=${page}&limit=15`;
      if (statusFilter !== "ALL") url += `&status=${statusFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Fetch students error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStudents(); }, [page, statusFilter]);

  async function handleStatusChange(id, newStatus) {
    if (!confirm(`Are you sure you want to mark this student as ${newStatus}?`)) return;
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Permanently delete this student record? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/students/${id}`, { method: "DELETE" });
      if (res.ok) setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  function statusBadge(status) {
    if (status === "APPROVED") return "bg-green-100 text-green-800";
    if (status === "REJECTED") return "bg-red-100 text-red-800";
    return "bg-amber-100 text-amber-800";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Student Registrations</h1>
          <p className="text-gray-600 text-sm mt-1">
            Review and manage student account applications. ({totalCount} Total)
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => { setStatusFilter(st); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st ? "bg-primary text-cream shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No students found for status &quot;{statusFilter}&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900">{s.name}</td>
                    <td className="py-4 px-4">
                      <span className="bg-cream/60 text-primary px-2.5 py-1 rounded-md text-xs font-medium border border-accent/20">
                        {s.program}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs space-y-0.5">
                      <p className="font-medium text-gray-800">{s.phone}</p>
                      <p className="text-gray-400">{s.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusBadge(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {s.status !== "APPROVED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "APPROVED")}
                            title="Approve"
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {s.status !== "REJECTED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "REJECTED")}
                            title="Reject"
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {s.status === "APPROVED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "PENDING")}
                            title="Set Pending"
                            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(s.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="py-3 px-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border bg-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border bg-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
