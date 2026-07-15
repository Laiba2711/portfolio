"use client";

import { useEffect, useState } from "react";
import {
  getExperiences,
  saveExperience,
  deleteExperience,
} from "@/app/admin/actions";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: Date | string;
  endDate: Date | string | null;
  current: boolean;
  description: string | null;
  location: string | null;
  order: number;
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experience> | null>(null);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await getExperiences();
      setExperiences(data as Experience[]);
    } catch {
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenAdd = () => {
    setCurrentExp({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
      order: experiences.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    // Format dates to YYYY-MM for input field
    const fmt = (d: Date | string | null | undefined) => {
      if (!d) return "";
      const date = new Date(d);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };
    setCurrentExp({
      ...exp,
      startDate: fmt(exp.startDate),
      endDate: fmt(exp.endDate),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience item?")) return;
    try {
      await deleteExperience(id);
      toast.success("Experience deleted");
      fetchExperiences();
    } catch {
      toast.error("Failed to delete experience");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExp?.company || !currentExp?.role || !currentExp?.startDate) {
      toast.error("Company, Role, and Start Date are required");
      return;
    }

    setSaving(true);
    try {
      await saveExperience({
        id: currentExp.id,
        company: currentExp.company,
        role: currentExp.role,
        startDate: currentExp.startDate as string,
        endDate: currentExp.endDate as string || undefined,
        current: !!currentExp.current,
        description: currentExp.description || undefined,
        location: currentExp.location || undefined,
        order: Number(currentExp.order) || 0,
      });

      toast.success(currentExp.id ? "Experience updated" : "Experience added");
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  const formatDateLabel = (d: Date | string | null | undefined) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
            <Briefcase size={22} className="text-blue-400" />
            Manage Experience
          </h1>
          <p className="text-sm text-gray-400">Add, edit, or delete items on your work history timeline</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary py-2.5 px-4 text-sm rounded-xl">
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-blue-500" size={24} />
        </div>
      ) : experiences.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
          No experience items found. Add your first position!
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold font-['Space_Grotesk']">{exp.role}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {exp.company}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDateLabel(exp.startDate)} - {exp.current ? "Present" : formatDateLabel(exp.endDate)}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-400 max-w-2xl mt-1 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 self-end md:self-center">
                <button onClick={() => handleOpenEdit(exp)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && currentExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-white/10 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold font-['Space_Grotesk']">
              {currentExp.id ? "Edit Experience" : "Add Experience"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Role / Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer"
                    value={currentExp.role || ""}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, role: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google"
                    value={currentExp.company || ""}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, company: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New York, NY (Remote)"
                    value={currentExp.location || ""}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, location: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
                  <input
                    type="number"
                    required
                    value={currentExp.order === undefined ? "" : currentExp.order}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Start Date</label>
                  <input
                    type="month"
                    required
                    value={currentExp.startDate as string || ""}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, startDate: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">End Date</label>
                  <input
                    type="month"
                    disabled={!!currentExp.current}
                    value={currentExp.current ? "" : (currentExp.endDate as string || "")}
                    onChange={(e) => setCurrentExp(prev => ({ ...prev, endDate: e.target.value }))}
                    className="form-input text-sm disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="current"
                  checked={!!currentExp.current}
                  onChange={(e) => setCurrentExp(prev => ({ ...prev, current: e.target.checked }))}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 accent-blue-500"
                />
                <label htmlFor="current" className="text-sm font-medium text-gray-300 cursor-pointer">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your achievements and responsibilities..."
                  value={currentExp.description || ""}
                  onChange={(e) => setCurrentExp(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary py-2 px-4 text-xs rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-4 text-xs rounded-xl flex items-center gap-1.5">
                  {saving ? <RefreshCw className="animate-spin" size={12} /> : <Check size={12} />}
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
