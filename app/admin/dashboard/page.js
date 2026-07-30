"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Calendar, ArrowRight, Clock, AlertCircle } from "lucide-react";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, enquiriesRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/enquiries?limit=5"),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.ok ? await statsRes.json() : {};
          setStats(statsData.stats);
        }

        if (enquiriesRes.ok) {
          const enquiriesData = await enquiriesRes.json();
          setRecentEnquiries(enquiriesData.enquiries || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back to the Shivangikam management portal.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">New Enquiries</span>
            <div className="text-3xl font-bold text-primary mt-1">
              {loading ? "..." : stats?.newEnquiries ?? 0}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/20 text-primary flex items-center justify-center font-bold">
            <Inbox className="w-6 h-6 text-accent" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Enquiries</span>
            <div className="text-3xl font-bold text-primary mt-1">
              {loading ? "..." : stats?.totalEnquiries ?? 0}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Active Events</span>
            <div className="text-3xl font-bold text-primary mt-1">
              {loading ? "..." : stats?.activeEvents ?? 0}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-primary">Recent Student Enquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest submissions from website visitors</p>
          </div>
          <Link
            href="/admin/dashboard/enquiries"
            className="text-accent font-semibold text-sm hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500 text-sm">Loading recent enquiries...</div>
        ) : recentEnquiries.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            No enquiries received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-medium text-gray-900">{e.name}</td>
                    <td className="py-3.5 px-4">{e.program}</td>
                    <td className="py-3.5 px-4">{e.phone}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        e.status === 'NEW'
                          ? 'bg-amber-100 text-amber-800'
                          : e.status === 'ENROLLED'
                          ? 'bg-green-100 text-green-800'
                          : e.status === 'CONTACTED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
