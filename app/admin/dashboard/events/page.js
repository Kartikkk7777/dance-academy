"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, Check, X, AlertCircle } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    isActive: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error("Fetch events error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleOpenCreate() {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      isActive: true,
    });
    setError("");
    setShowModal(true);
  }

  function handleOpenEdit(eventItem) {
    setEditingEvent(eventItem);
    setFormData({
      title: eventItem.title,
      description: eventItem.description,
      date: new Date(eventItem.date).toISOString().split("T")[0],
      isActive: eventItem.isActive,
    });
    setError("");
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = editingEvent ? `/api/admin/events/${editingEvent.id}` : "/api/admin/events";
      const method = editingEvent ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save event.");
        setSubmitting(false);
        return;
      }

      setShowModal(false);
      fetchEvents();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleActive(eventItem) {
    try {
      const res = await fetch(`/api/admin/events/${eventItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !eventItem.isActive }),
      });

      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === eventItem.id ? { ...e, isActive: !e.isActive } : e))
        );
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Delete event error:", err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Upcoming Events</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage stage performances, workshops, and academy announcements.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-accent text-primary px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-400 shadow-sm transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            No events created yet. Click "Add New Event" to publish your first announcement.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border transition-all ${
                  item.isActive
                    ? "bg-white border-gray-200 shadow-sm"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md mb-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-xl font-bold text-primary leading-snug">{item.title}</h3>
                  </div>

                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                      item.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.isActive ? "Published" : "Draft"}
                  </button>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-2xl font-bold text-primary">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill in the details below to publish an announcement.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Classical Dance Showcase 2026"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  maxLength={3000}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide event details, venue info, and schedule..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700 font-medium">
                  Publish Event Immediately
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-gray-600 font-semibold text-sm hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-cream px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-maroon-dark disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
