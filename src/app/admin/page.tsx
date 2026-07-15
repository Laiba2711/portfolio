"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Briefcase,
  Code2,
  MessageSquare,
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Mail,
  Clock,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Stats {
  projects: number;
  messages: number;
  unreadMessages: number;
  experiences: number;
  skills: number;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface DashboardData {
  stats: Stats;
  recentMessages: RecentMessage[];
  resumeUrl: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  UNREAD: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  READ: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  REPLIED: "text-green-400 bg-green-500/10 border-green-500/20",
  ARCHIVED: "text-gray-400 bg-gray-500/10 border-gray-500/20",
};

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Resume upload state
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append("resume", file);
      const res = await fetch("/api/admin/resume", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData((prev) => prev ? { ...prev, resumeUrl: json.resumeUrl } : prev);
      toast.success("Resume uploaded successfully! Visitors can now download it.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Remove the current resume? Visitors won't be able to download it.")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/resume", { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setData((prev) => prev ? { ...prev, resumeUrl: null } : prev);
      toast.success("Resume removed");
    } catch {
      toast.error("Failed to remove resume");
    } finally {
      setDeleting(false);
    }
  };

  const onFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const STAT_CARDS = data
    ? [
        {
          title: "Projects",
          value: data.stats.projects,
          icon: Layers,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
          border: "border-purple-500/20",
          href: "/admin/projects",
          desc: "in portfolio",
        },
        {
          title: "Messages",
          value: data.stats.messages,
          icon: MessageSquare,
          color: "text-pink-400",
          bg: "bg-pink-500/10",
          border: "border-pink-500/20",
          href: "/admin/messages",
          desc: `${data.stats.unreadMessages} unread`,
          badge: data.stats.unreadMessages > 0 ? data.stats.unreadMessages : null,
        },
        {
          title: "Experience",
          value: data.stats.experiences,
          icon: Briefcase,
          color: "text-blue-400",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          href: "/admin/experience",
          desc: "positions added",
        },
        {
          title: "Skills",
          value: data.stats.skills,
          icon: Code2,
          color: "text-cyan-400",
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/20",
          href: "/admin/skills",
          desc: "skills listed",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-80 bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {session?.user?.name ?? session?.user?.email?.split("@")[0] ?? "Admin"}
            </span>{" "}
            👋
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Manage your portfolio content from here
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={stat.href}
                className="block group rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.bg} border ${stat.border}`}>
                    <Icon size={18} className={stat.color} />
                  </div>
                  {stat.badge && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                      {stat.badge} new
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs mb-1 font-medium tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "JetBrains Mono, monospace" }}>
                    {stat.title}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3
                      className="text-4xl font-black"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {stat.value}
                    </h3>
                    <span className="flex items-center gap-1 text-xs pb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {stat.desc}
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors hover:text-white"
              style={{
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              View all
              <ExternalLink size={11} />
            </Link>
          </div>

          {data?.recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <Mail size={20} style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                No messages yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data?.recentMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  <Link
                    href="/admin/messages"
                    className="flex items-center gap-4 p-4 rounded-xl group transition-all hover:bg-white/[0.04]"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        color: "#c084fc",
                      }}
                    >
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.name}</p>
                      <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {msg.subject}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border tracking-wide ${STATUS_COLORS[msg.status] ?? "text-gray-400"}`}
                      >
                        {msg.status}
                      </span>
                      <span
                        className="flex items-center gap-1 text-[10px]"
                        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}
                      >
                        <Clock size={9} />
                        {timeAgo(msg.createdAt)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Resume Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <h2
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Resume
            </h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Upload your PDF resume — visitors can download it from the site
            </p>
          </div>

          {/* Current Status */}
          <AnimatePresence mode="wait">
            {data?.resumeUrl ? (
              <motion.div
                key="has-resume"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{
                  background: "rgba(34,197,94,0.07)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <p className="text-sm font-medium text-green-400">Resume is live</p>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>
                  {data.resumeUrl}
                </p>
                <div className="flex gap-2">
                  <a
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.25)",
                      color: "#4ade80",
                    }}
                  >
                    <ExternalLink size={12} />
                    Preview
                  </a>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#f87171",
                    }}
                  >
                    {deleting ? (
                      <RefreshCw size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                    Remove
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-resume"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl p-3 flex items-center gap-2"
                style={{
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
              >
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-xs" style={{ color: "rgba(239,68,68,0.8)" }}>
                  No resume uploaded — download links are broken
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl cursor-pointer transition-all duration-300"
            style={{
              border: `2px dashed ${dragOver ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)"}`,
              background: dragOver ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />
            {uploading ? (
              <>
                <RefreshCw size={24} className="animate-spin" style={{ color: "#7c3aed" }} />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Uploading…
                </p>
              </>
            ) : (
              <>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}
                >
                  {dragOver ? <Upload size={18} style={{ color: "#c084fc" }} /> : <FileText size={18} style={{ color: "#c084fc" }} />}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {dragOver ? "Drop it here!" : "Drop PDF here or click to browse"}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                    PDF only · Max 10MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>
              Quick Actions
            </p>
            {[
              { label: "Manage Projects", href: "/admin/projects", icon: Layers },
              { label: "View Messages", href: "/admin/messages", icon: MessageSquare },
              { label: "Update Skills", href: "/admin/skills", icon: Code2 },
              { label: "View Portfolio", href: "/", icon: ExternalLink, external: true },
            ].map(({ label, href, icon: Icon, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/[0.06] group"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <Icon size={13} style={{ color: "rgba(124,58,237,0.8)" }} />
                {label}
                <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
