"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, Clock, Trash2, ChevronLeft, ChevronRight, Key } from "lucide-react";

const STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED"];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Password Change State
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newPassword, setNewPassword] = useState("");

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

  async function handlePasswordChange(e) {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!confirm(`Are you sure you want to change the password for ${selectedStudent.name}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/students/${selectedStudent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      if (res.ok) {
        alert("Password updated successfully.");
        setPwModalOpen(false);
        setNewPassword("");
        setSelectedStudent(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update password.");
      }
    } catch (err) {
      console.error("Password update error:", err);
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
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {s.status !== "APPROVED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "APPROVED")}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {s.status !== "REJECTED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "REJECTED")}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                        {s.status === "APPROVED" && (
                          <button
                            onClick={() => handleStatusChange(s.id, "PENDING")}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Set Pending</span>
                          </button>
                        )}
                        <button
                          onClick={() => { setSelectedStudent(s); setNewPassword(""); setPwModalOpen(true); }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Password</span>
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 bg-gray-50 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
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

      {/* Change Password Modal */}
      {pwModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => { setPwModalOpen(false); setSelectedStudent(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-2xl font-bold text-primary font-serif">Change Student Password</h2>
              <p className="text-xs text-gray-500 mt-1">
                Setting password for <strong>{selectedStudent.name}</strong> ({selectedStudent.email})
              </p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">New Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                  required
                  minLength={8}
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setPwModalOpen(false); setSelectedStudent(null); }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-cream bg-primary hover:bg-maroon-dark transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

