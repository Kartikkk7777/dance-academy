"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Clock, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      let url = `/api/admin/enquiries?page=${page}&limit=15`;
      if (statusFilter !== "ALL") {
        url += `&status=${statusFilter}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Fetch enquiries error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, [page, statusFilter]);

  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
    }
  }

  const statuses = ["ALL", "NEW", "CONTACTED", "ENROLLED", "CLOSED"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Student Enquiries</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage contact form submissions and applicant statuses. ({totalCount} Total)
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-primary text-cream shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No enquiries found for status "{statusFilter}".
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      <span className="bg-cream/60 text-primary px-2.5 py-1 rounded-md text-xs font-medium border border-accent/20">
                        {item.program}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-medium text-gray-800">
                        <Phone className="w-3.5 h-3.5 text-accent" />
                        <span>{item.phone}</span>
                      </div>
                      {item.email && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{item.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border border-gray-200 cursor-pointer focus:outline-none ${
                          item.status === "NEW"
                            ? "bg-amber-100 text-amber-800"
                            : item.status === "ENROLLED"
                            ? "bg-green-100 text-green-800"
                            : item.status === "CONTACTED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="ENROLLED">ENROLLED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(item)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="py-3 px-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              Page {page} of {totalPages}
            </span>
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Enquiry Details
              </span>
              <h2 className="text-2xl font-bold text-primary mt-1">{selectedEnquiry.name}</h2>
              <span className="text-xs text-gray-400">
                Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
              <div>
                <span className="text-xs font-semibold text-gray-500 block">Program Requested</span>
                <span className="font-medium text-gray-900">{selectedEnquiry.program}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 block">Phone Number</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-medium text-primary hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.email && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-primary hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-2">Message Body</span>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="text-red-600 hover:underline text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Submission
              </button>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-primary text-cream px-5 py-2 rounded-xl text-sm font-semibold hover:bg-maroon-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
