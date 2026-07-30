"use client";

import { useEffect, useState } from "react";
import { Save, Lock, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    phone1: "",
    phone2: "",
    email: "",
    instagram: "",
    address: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState({ type: "", text: "" });

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings({
              phone1: data.settings.phone1 || "",
              phone2: data.settings.phone2 || "",
              email: data.settings.email || "",
              instagram: data.settings.instagram || "",
              address: data.settings.address || "",
            });
          }
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
      } finally {
        setLoadingSettings(false);
      }
    }

    fetchSettings();
  }, []);

  async function handleSaveSettings(e) {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        setSettingsMsg({ type: "error", text: data.message || "Failed to update settings." });
      } else {
        setSettingsMsg({ type: "success", text: "Contact information updated successfully." });
      }
    } catch {
      setSettingsMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordMsg({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: "error", text: "New password and confirmation do not match." });
      setSavingPassword(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordMsg({ type: "error", text: data.message || "Failed to change password." });
      } else {
        setPasswordMsg({ type: "success", text: "Password changed successfully." });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Settings & Profile</h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage site contact details and admin security settings.
        </p>
      </div>

      {/* Site Contact Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-accent/20 text-primary flex items-center justify-center font-bold">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Academy Contact Details</h2>
            <p className="text-xs text-gray-500">Information displayed on site header/footer & contact page</p>
          </div>
        </div>

        {settingsMsg.text && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
              settingsMsg.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {settingsMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{settingsMsg.text}</span>
          </div>
        )}

        {loadingSettings ? (
          <div className="py-8 text-center text-gray-500 text-sm">Loading contact settings...</div>
        ) : (
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Primary Phone
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone1}
                  onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  value={settings.phone2}
                  onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Academy Email
                </label>
                <input
                  type="email"
                  required
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Full Physical Address
              </label>
              <textarea
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-primary text-cream px-6 py-2.5 rounded-xl font-bold hover:bg-maroon-dark shadow-sm text-sm inline-flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? "Saving..." : "Save Contact Info"}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Admin Security Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Change Security Password</h2>
            <p className="text-xs text-gray-500">Update your account login password</p>
          </div>
        </div>

        {passwordMsg.text && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
              passwordMsg.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {passwordMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              New Password (min 8 chars)
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-accent focus:border-accent"
            />
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="submit"
              disabled={savingPassword}
              className="bg-accent text-primary px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-400 shadow-sm text-sm inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{savingPassword ? "Updating..." : "Update Password"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
