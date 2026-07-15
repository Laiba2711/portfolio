"use client";

import { useEffect, useState } from "react";
import {
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "@/app/admin/actions";
import {
  MessageSquare,
  Trash2,
  Mail,
  Clock,
  RefreshCw,
  Eye,
  Archive,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

type MessageStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: Date | string;
}

const STATUS_OPTIONS: MessageStatus[] = ["UNREAD", "READ", "REPLIED", "ARCHIVED"];

const STATUS_LABELS: Record<MessageStatus, string> = {
  UNREAD: "Unread",
  READ: "Read",
  REPLIED: "Replied",
  ARCHIVED: "Archived",
};

const STATUS_CLASSES: Record<MessageStatus, string> = {
  UNREAD: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  READ: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  REPLIED: "text-green-400 bg-green-500/10 border-green-500/20",
  ARCHIVED: "text-gray-400 bg-gray-500/10 border-gray-500/20",
};

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data as Message[]);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, status: MessageStatus) => {
    try {
      await updateMessageStatus(id, status);
      toast.success(`Message status updated to ${STATUS_LABELS[status]}`);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
      );
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage((prev) => prev ? { ...prev, status } : null);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage(null);
      }
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const handleViewMessage = (msg: Message) => {
    setActiveMessage(msg);
    if (msg.status === "UNREAD") {
      handleStatusChange(msg.id, "READ");
    }
  };

  const formatDateLabel = (d: Date | string | null | undefined) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
            <MessageSquare size={22} className="text-pink-400" />
            Inbound Messages
          </h1>
          <p className="text-sm text-gray-400">View and respond to inquiries from your contact page</p>
        </div>
        <button onClick={fetchMessages} className="btn-secondary py-2 px-3 text-xs rounded-xl flex items-center gap-1.5">
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <RefreshCw className="animate-spin text-pink-500" size={24} />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 glass-card p-12 flex flex-col items-center justify-center text-center text-gray-400 rounded-2xl">
          <Mail size={40} className="text-white/10 mb-4" />
          No messages received yet.
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Inbox List */}
          <div className="lg:col-span-1 glass-card rounded-2xl p-4 overflow-y-auto flex flex-col gap-2.5 border border-white/5">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleViewMessage(msg)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeMessage?.id === msg.id
                    ? "bg-white/5 border-pink-500/30"
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="font-bold text-sm truncate max-w-[130px]">{msg.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${STATUS_CLASSES[msg.status]}`}>
                    {STATUS_LABELS[msg.status]}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate text-gray-300">{msg.subject}</div>
                <div className="text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                  <Clock size={10} />
                  {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </button>
            ))}
          </div>

          {/* Message Reader */}
          <div className="lg:col-span-2 flex flex-col">
            {activeMessage ? (
              <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 min-h-0">
                <div className="space-y-6 overflow-y-auto pr-2">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/5">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold font-['Space_Grotesk'] leading-tight">{activeMessage.subject}</h2>
                      <div className="text-xs text-gray-400">
                        From: <span className="text-white font-medium">{activeMessage.name}</span> &lt;
                        <a href={`mailto:${activeMessage.email}`} className="text-pink-400 hover:underline">
                          {activeMessage.email}
                        </a>
                        &gt;
                      </div>
                      <div className="text-[10px] text-gray-500 flex items-center gap-1 font-mono pt-1">
                        <Clock size={10} />
                        {formatDateLabel(activeMessage.createdAt)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(activeMessage.id, "REPLIED")}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      >
                        <CheckCheck size={12} />
                        Replied
                      </button>
                      <button
                        onClick={() => handleStatusChange(activeMessage.id, "ARCHIVED")}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors bg-white/5 text-gray-400 hover:bg-white/10"
                      >
                        <Archive size={12} />
                        Archive
                      </button>
                      <button
                        onClick={() => handleDelete(activeMessage.id)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="text-sm leading-relaxed text-gray-200 whitespace-pre-wrap select-text">
                    {activeMessage.message}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6 flex justify-between items-center text-xs text-gray-500 flex-shrink-0">
                  <span>Mark status:</span>
                  <div className="flex gap-2">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleStatusChange(activeMessage.id, opt)}
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                          activeMessage.status === opt
                            ? STATUS_CLASSES[opt]
                            : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5"
                        }`}
                      >
                        {STATUS_LABELS[opt]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 glass-card rounded-2xl flex flex-col items-center justify-center text-center text-gray-500 border border-white/5">
                <Eye size={32} className="text-white/10 mb-3" />
                Select a message from the list to read it.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
