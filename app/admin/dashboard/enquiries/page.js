"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState({ total: 0, new: 0, todayNew: 0 });

  async function fetchEnquiries() {
    setLoading(true);
    try {
      let url = `/api/admin/enquiries?page=${page}&limit=12`;
      if (statusFilter !== "ALL") {
        url += `&status=${statusFilter}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
        if (data.stats) {
          setStats(data.stats);
        }
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
        // Refresh stats to update counts
        const statsRes = await fetch(`/api/admin/enquiries?page=${page}&limit=12${statusFilter !== "ALL" ? `&status=${statusFilter}` : ""}`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.stats) {
            setStats(statsData.stats);
          }
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
        // Refresh stats and counts
        const statsRes = await fetch(`/api/admin/enquiries?page=${page}&limit=12${statusFilter !== "ALL" ? `&status=${statusFilter}` : ""}`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setTotalPages(statsData.pagination?.totalPages || 1);
          setTotalCount(statsData.pagination?.total || 0);
          if (statsData.stats) {
            setStats(statsData.stats);
          }
        }
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
    }
  }

  const statuses = ["ALL", "NEW", "CONTACTED", "ENROLLED", "CLOSED"];

  return (
    <div className="space-y-6">
      {/* Header section */}
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

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total Messages */}
        <div className="bg-white rounded-2xl border-l-4 border-l-primary border border-gray-100 p-6 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Total Messages</span>
          <span className="text-3xl font-bold text-gray-950 mt-2 block">{stats.total}</span>
        </div>
        
        {/* Card 2: Unread/New Messages */}
        <div className="bg-white rounded-2xl border-l-4 border-l-amber-500 border border-gray-100 p-6 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Unread / New</span>
          <span className="text-3xl font-bold text-gray-950 mt-2 block">{stats.new}</span>
        </div>

        {/* Card 3: Today's New */}
        <div className="bg-white rounded-2xl border-l-4 border-l-blue-500 border border-gray-100 p-6 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Today's New</span>
          <span className="text-3xl font-bold text-gray-950 mt-2 block">{stats.todayNew}</span>
        </div>
      </div>

      {/* Enquiries Card Grid */}
      <div>
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-100 shadow-sm">
            No enquiries found for status "{statusFilter}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enquiries.map((item) => {
              // Left edge color reflecting status
              let statusBorderColor = "border-l-gray-400";
              if (item.status === "NEW") statusBorderColor = "border-l-amber-500";
              else if (item.status === "CONTACTED") statusBorderColor = "border-l-blue-500";
              else if (item.status === "ENROLLED") statusBorderColor = "border-l-green-500";

              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col border-l-4 ${statusBorderColor} transition-all hover:shadow-md`}
                >
                  <div className="p-6 flex-grow flex flex-col space-y-4">
                    {/* Top Row: Name/Badge/Dot & Date */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          {item.status === "NEW" && (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" title="New enquiry indicator" />
                          )}
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
                        </div>
                        <div>
                          <span className="bg-cream/60 text-primary px-2.5 py-0.5 rounded-md text-xs font-semibold border border-accent/20">
                            {item.program}
                          </span>
                        </div>
                      </div>
                      
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600">
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium">
                        <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{item.phone}</span>
                      </a>
                      {item.email && (
                        <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{item.email}</span>
                        </a>
                      )}
                    </div>

                    {/* Message Bubble style */}
                    <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap flex-grow">
                      {item.message}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">
                      ID: #{item.id.slice(-6).toUpperCase()}
                    </span>

                    <div className="flex items-center gap-3">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer focus:outline-none ${
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

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 bg-white hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="mt-6 py-3 px-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-xs text-gray-500">
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
    </div>
  );
}
