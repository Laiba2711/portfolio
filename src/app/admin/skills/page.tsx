"use client";

import { useEffect, useState } from "react";
import {
  getSkills,
  saveSkill,
  deleteSkill,
} from "@/app/admin/actions";
import {
  Code2,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

type SkillCategory = "FRONTEND" | "BACKEND" | "DATABASE" | "TOOLS" | "OTHER";

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  order: number;
}

const CATEGORIES: SkillCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "TOOLS",
  "OTHER",
];

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  FRONTEND: "Frontend Dev",
  BACKEND: "Backend Dev",
  DATABASE: "Database & Storage",
  TOOLS: "DevOps & Tools",
  OTHER: "Other Skills",
};

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill> | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await getSkills();
      setSkills(data as Skill[]);
    } catch {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setCurrentSkill({
      name: "",
      category: "FRONTEND",
      level: 80,
      order: skills.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setCurrentSkill(skill);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch {
      toast.error("Failed to delete skill");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkill?.name || !currentSkill?.category) {
      toast.error("Name and Category are required");
      return;
    }

    setSaving(true);
    try {
      await saveSkill({
        id: currentSkill.id,
        name: currentSkill.name,
        category: currentSkill.category,
        level: Number(currentSkill.level) || 0,
        order: Number(currentSkill.order) || 0,
      });

      toast.success(currentSkill.id ? "Skill updated" : "Skill added");
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skill");
    } finally {
      setSaving(false);
    }
  };

  // Group skills by category
  const groupedSkills = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
            <Code2 size={22} className="text-cyan-400" />
            Manage Skills
          </h1>
          <p className="text-sm text-gray-400">List and quantify your technical proficiencies</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary py-2.5 px-4 text-sm rounded-xl">
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-cyan-500" size={24} />
        </div>
      ) : skills.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
          No skills found. Add your first proficiency badge!
        </div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const list = groupedSkills[cat];
            if (list.length === 0) return null;
            return (
              <div key={cat} className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase font-mono">
                  {CATEGORY_LABELS[cat]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((skill) => (
                    <div key={skill.id} className="glass-card p-4 rounded-xl flex items-center justify-between border border-white/5 group">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-sm font-medium mb-1.5">
                          <span>{skill.name}</span>
                          <span className="text-xs text-cyan-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenEdit(skill)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-blue-400 transition-colors" title="Edit">
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && currentSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-white/10 space-y-6 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold font-['Space_Grotesk']">
              {currentSkill.id ? "Edit Skill" : "Add Skill"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Node.js"
                  value={currentSkill.name || ""}
                  onChange={(e) => setCurrentSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
                <select
                  value={currentSkill.category || "FRONTEND"}
                  onChange={(e) => setCurrentSkill(prev => ({ ...prev, category: e.target.value as SkillCategory }))}
                  className="form-input text-sm"
                  style={{ colorScheme: "dark", background: "#0c0c20" }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  <span>Level of Proficiency</span>
                  <span className="text-cyan-400">{currentSkill.level || 0}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentSkill.level || 0}
                  onChange={(e) => setCurrentSkill(prev => ({ ...prev, level: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
                <input
                  type="number"
                  required
                  value={currentSkill.order === undefined ? "" : currentSkill.order}
                  onChange={(e) => setCurrentSkill(prev => ({ ...prev, order: Number(e.target.value) }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary py-2 px-4 text-xs rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-4 text-xs rounded-xl flex items-center gap-1.5">
                  {saving ? <RefreshCw className="animate-spin" size={12} /> : <Check size={12} />}
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
