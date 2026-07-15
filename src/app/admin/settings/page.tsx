"use client";

import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/app/admin/actions";
import {
  Settings,
  Mail,
  Github,
  Linkedin,
  Twitter,
  RefreshCw,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface SettingsData {
  id: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string | null;
}

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await getSettings();
        setSettings(data as SettingsData);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;

    if (!settings.email || !settings.githubUrl || !settings.linkedinUrl) {
      toast.error("Email, GitHub, and LinkedIn URLs are required");
      return;
    }

    setSaving(true);
    try {
      await saveSettings({
        id: settings.id,
        email: settings.email,
        githubUrl: settings.githubUrl,
        linkedinUrl: settings.linkedinUrl,
        twitterUrl: settings.twitterUrl || undefined,
      });
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 animate-pulse">
          <div className="h-8 w-48 bg-white/5 rounded-xl" />
          <div className="h-4 w-64 bg-white/5 rounded-lg" />
        </div>
        <div className="glass-card p-6 rounded-2xl h-80 bg-white/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
          <Settings size={22} className="text-purple-400" />
          Global Settings
        </h1>
        <p className="text-sm text-gray-400">Update contacts, social URLs, and links used across the site</p>
      </div>

      {settings && (
        <form onSubmit={handleSave} className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="space-y-4">
            {/* Contact Email */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Mail size={13} className="text-purple-400" />
                Contact Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="form-input text-sm"
              />
              <p className="text-[10px] text-gray-500 mt-1">This email will receive inquiries from your contact form.</p>
            </div>

            {/* GitHub Profile */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Github size={13} className="text-purple-400" />
                GitHub URL
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/username"
                value={settings.githubUrl}
                onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                className="form-input text-sm"
              />
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Linkedin size={13} className="text-purple-400" />
                LinkedIn URL
              </label>
              <input
                type="url"
                required
                placeholder="https://linkedin.com/in/username"
                value={settings.linkedinUrl}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="form-input text-sm"
              />
            </div>

            {/* Twitter Profile */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <Twitter size={13} className="text-purple-400" />
                Twitter URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://twitter.com/username"
                value={settings.twitterUrl || ""}
                onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value || null })}
                className="form-input text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button type="submit" disabled={saving} className="btn-primary py-2.5 px-5 text-sm rounded-xl flex items-center gap-2">
              {saving ? <RefreshCw className="animate-spin" size={14} /> : <Check size={14} />}
              Save Configuration
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
