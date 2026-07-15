"use client";

import { useEffect, useState } from "react";
import {
  getProjects,
  saveProject,
  deleteProject,
} from "@/app/admin/actions";
import {
  Layers,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  Star,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  liveUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  category: string | null;
  featured: boolean;
  order: number;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data as Project[]);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setCurrentProject({
      title: "",
      slug: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      techStack: [],
      category: "",
      featured: false,
      order: projects.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject?.title || !currentProject?.description) {
      toast.error("Title and Description are required");
      return;
    }

    setSaving(true);
    try {
      const slug = currentProject.slug || currentProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const techStack = Array.isArray(currentProject.techStack)
        ? currentProject.techStack
        : typeof currentProject.techStack === "string"
        ? (currentProject.techStack as string).split(",").map(t => t.trim()).filter(Boolean)
        : [];

      await saveProject({
        id: currentProject.id,
        title: currentProject.title,
        slug,
        description: currentProject.description,
        liveUrl: currentProject.liveUrl || undefined,
        githubUrl: currentProject.githubUrl || undefined,
        techStack,
        category: currentProject.category || undefined,
        featured: !!currentProject.featured,
        order: Number(currentProject.order) || 0,
      });

      toast.success(currentProject.id ? "Project updated" : "Project created");
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
            <Layers size={22} className="text-purple-400" />
            Manage Projects
          </h1>
          <p className="text-sm text-gray-400">Add, edit, or delete items in your portfolio grid</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary py-2.5 px-4 text-sm rounded-xl">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-purple-500" size={24} />
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
          No projects found. Add your first project to showcase!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div key={project.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-purple-300">
                    {project.category || "General"}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                      <Star size={10} fill="currentColor" />
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-1">{project.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Live Preview">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Source Code">
                      <Github size={16} />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(project)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 transition-colors" title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-white/10 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold font-['Space_Grotesk']">
              {currentProject.id ? "Edit Project" : "Add Project"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Portfolio Website"
                  value={currentProject.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setCurrentProject(prev => ({ ...prev, title, slug }));
                  }}
                  className="form-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="portfolio-website"
                    value={currentProject.slug || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, slug: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. SaaS, Fintech"
                    value={currentProject.category || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, category: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Short Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your project briefly..."
                  value={currentProject.description || ""}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={currentProject.liveUrl || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={currentProject.githubUrl || ""}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, Tailwind CSS, TypeScript, Prisma"
                  value={Array.isArray(currentProject.techStack) ? currentProject.techStack.join(", ") : currentProject.techStack || ""}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, techStack: e.target.value as unknown as string[] }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
                  <input
                    type="number"
                    required
                    value={currentProject.order === undefined ? "" : currentProject.order}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="form-input text-sm"
                  />
                </div>
                <div className="flex items-center gap-2.5 mt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={!!currentProject.featured}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 accent-purple-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-300 cursor-pointer">
                    Featured Project
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary py-2 px-4 text-xs rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-4 text-xs rounded-xl flex items-center gap-1.5">
                  {saving ? <RefreshCw className="animate-spin" size={12} /> : <Check size={12} />}
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
