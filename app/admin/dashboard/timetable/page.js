"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, User, Plus, Edit2, Trash2, X, Check, Power } from "lucide-react";

const PROGRAMS = [
  'Classical Dance',
  'Semi-Classical',
  'Bollywood',
  'Zumba',
  'Yoga',
  'Vocal Music',
  'Guitar',
  'Tabla',
  'Wedding Choreography',
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AdminTimetablePage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  // Form State
  const [programName, setProgramName] = useState(PROGRAMS[0]);
  const [dayOfWeek, setDayOfWeek] = useState(DAYS[0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [isActive, setIsActive] = useState(true);

  async function fetchSlots() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/timetable");
      if (res.ok) {
        const data = await res.json();
        setSlots(data.slots || []);
      }
    } catch (err) {
      console.error("Fetch timetable slots error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  function openAddModal() {
    setEditingSlot(null);
    setProgramName(PROGRAMS[0]);
    setDayOfWeek(DAYS[0]);
    setStartTime("17:00");
    setEndTime("18:00");
    setInstructor("");
    setIsActive(true);
    setIsModalOpen(true);
  }

  function openEditModal(slot) {
    setEditingSlot(slot);
    setProgramName(slot.programName);
    setDayOfWeek(slot.dayOfWeek);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setInstructor(slot.instructor || "");
    setIsActive(slot.isActive);
    setIsModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!startTime || !endTime) {
      alert("Start time and end time are required.");
      return;
    }

    const payload = {
      programName,
      dayOfWeek,
      startTime,
      endTime,
      instructor: instructor.trim() || null,
      isActive,
    };

    try {
      const url = editingSlot ? `/api/admin/timetable/${editingSlot.id}` : "/api/admin/timetable";
      const method = editingSlot ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchSlots();
      } else {
        const errData = await res.json();
        alert(errData.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Submit timetable slot error:", err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this timetable slot? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/timetable/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSlots((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Delete slot error:", err);
    }
  }

  async function toggleStatus(slot) {
    try {
      const res = await fetch(`/api/admin/timetable/${slot.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !slot.isActive }),
      });
      if (res.ok) {
        setSlots((prev) =>
          prev.map((s) => (s.id === slot.id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Class Timetable</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage schedule slots for the academy programs.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 bg-primary text-cream px-4 py-2 rounded-xl text-sm font-bold hover:bg-maroon-dark transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slot</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading timetable slots...</div>
        ) : slots.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No timetable slots found. Click &quot;Add Slot&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4">Program</th>
                  <th className="py-3.5 px-4">Day</th>
                  <th className="py-3.5 px-4">Time Window</th>
                  <th className="py-3.5 px-4">Instructor</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {slots.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900">{s.programName}</td>
                    <td className="py-4 px-4 font-medium text-accent">{s.dayOfWeek}</td>
                    <td className="py-4 px-4 text-xs font-mono space-x-1">
                      <span>{s.startTime}</span>
                      <span className="text-gray-400">—</span>
                      <span>{s.endTime}</span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      {s.instructor ? (
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{s.instructor}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">None assigned</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(s)}
                        className={`text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 transition-colors ${
                          s.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>{s.isActive ? "Active" : "Inactive"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(s)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 bg-white hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors"
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
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-2xl font-bold text-primary font-serif">
                {editingSlot ? "Edit Timetable Slot" : "Add Timetable Slot"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Define when classes for a program take place.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Program</label>
                <select
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Day of Week</label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Start Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 17:00"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">End Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 18:30"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Instructor Name</label>
                <input
                  type="text"
                  placeholder="Optional instructor name"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 border-gray-300"
                />
                <label htmlFor="isActive" className="text-gray-700 font-medium">This timetable slot is active</label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-cream bg-primary hover:bg-maroon-dark transition-colors"
                >
                  {editingSlot ? "Save Changes" : "Create Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
