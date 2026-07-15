"use client";

import { useEffect, useState } from "react";
import {
  getEducations,
  saveEducation,
  deleteEducation,
} from "@/app/admin/actions";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  current: boolean;
  gpa: string | null;
  description: string | null;
  order: number;
}

export default function EducationAdmin() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<Partial<Education> | null>(null);

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const data = await getEducations();
      setEducations(data as Education[]);
    } catch {
      toast.error("Failed to load education entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdu({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
      order: educations.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    const fmt = (d: Date | string | null | undefined) => {
      if (!d) return "";
      const date = new Date(d);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };
    setCurrentEdu({
      ...edu,
      startDate: fmt(edu.startDate),
      endDate: fmt(edu.endDate),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await deleteEducation(id);
      toast.success("Education entry deleted");
      fetchEducations();
    } catch {
      toast.error("Failed to delete entry");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEdu?.institution || !currentEdu?.degree || !currentEdu?.startDate) {
      toast.error("Institution, Degree, and Start Date are required");
      return;
    }

    setSaving(true);
    try {
      await saveEducation({
        id: currentEdu.id,
        institution: currentEdu.institution,
        degree: currentEdu.degree,
        field: currentEdu.field || undefined,
        startDate: currentEdu.startDate as string,
        endDate: currentEdu.endDate as string || undefined,
        current: !!currentEdu.current,
        gpa: currentEdu.gpa || undefined,
        description: currentEdu.description || undefined,
        order: Number(currentEdu.order) || 0,
      });

      toast.success(currentEdu.id ? "Education updated" : "Education added");
      setModalOpen(false);
      fetchEducations();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save education entry");
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
            <GraduationCap size={22} className="text-purple-400" />
            Manage Education
          </h1>
          <p className="text-sm text-gray-400">Manage your academic accomplishments and degrees</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary py-2.5 px-4 text-sm rounded-xl">
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-purple-500" size={24} />
        </div>
      ) : educations.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
          No education history found. Add your first academic record!
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div key={edu.id} className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold font-['Space_Grotesk']">{edu.degree}</h3>
                  {edu.field && (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {edu.field}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-300">{edu.institution}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDateLabel(edu.startDate)} - {edu.current ? "Present" : formatDateLabel(edu.endDate)}
                  </span>
                  {edu.gpa && (
                    <span className="text-cyan-400 font-semibold">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
                {edu.description && (
                  <p className="text-xs text-gray-400 max-w-2xl mt-2 leading-relaxed whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 self-end md:self-center">
                <button onClick={() => handleOpenEdit(edu)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 transition-colors" title="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(edu.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && currentEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-white/10 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold font-['Space_Grotesk']">
              {currentEdu.id ? "Edit Education" : "Add Education"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Degree / Certificate</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bachelor of Science"
                    value={currentEdu.degree || ""}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, degree: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Institution Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    value={currentEdu.institution || ""}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, institution: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Field of Study</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={currentEdu.field || ""}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, field: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">GPA (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 3.9/4.0"
                    value={currentEdu.gpa || ""}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, gpa: e.target.value }))}
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
                    value={currentEdu.startDate as string || ""}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, startDate: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">End Date</label>
                  <input
                    type="month"
                    disabled={!!currentEdu.current}
                    value={currentEdu.current ? "" : (currentEdu.endDate as string || "")}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, endDate: e.target.value }))}
                    className="form-input text-sm disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="current-edu"
                  checked={!!currentEdu.current}
                  onChange={(e) => setCurrentEdu(prev => ({ ...prev, current: e.target.checked }))}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 accent-purple-500"
                />
                <label htmlFor="current-edu" className="text-sm font-medium text-gray-300 cursor-pointer">
                  I currently study here
                </label>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
                  <input
                    type="number"
                    required
                    value={currentEdu.order === undefined ? "" : currentEdu.order}
                    onChange={(e) => setCurrentEdu(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Describe your courses, societies, or achievements..."
                  value={currentEdu.description || ""}
                  onChange={(e) => setCurrentEdu(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary py-2 px-4 text-xs rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-4 text-xs rounded-xl flex items-center gap-1.5">
                  {saving ? <RefreshCw className="animate-spin" size={12} /> : <Check size={12} />}
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
