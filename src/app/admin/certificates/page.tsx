"use client";

import { useEffect, useState } from "react";
import {
  getCertificates,
  saveCertificate,
  deleteCertificate,
} from "@/app/admin/actions";
import {
  Award,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  ExternalLink,
  RefreshCw,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: Date | string;
  credentialId: string | null;
  url: string | null;
  description: string | null;
  order: number;
}

export default function CertificatesAdmin() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentCert, setCurrentCert] = useState<Partial<Certificate> | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await getCertificates();
      setCertificates(data as Certificate[]);
    } catch {
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleOpenAdd = () => {
    setCurrentCert({
      title: "",
      issuer: "",
      date: "",
      credentialId: "",
      url: "",
      description: "",
      order: certificates.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cert: Certificate) => {
    const fmt = (d: Date | string | null | undefined) => {
      if (!d) return "";
      const date = new Date(d);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };
    setCurrentCert({
      ...cert,
      date: fmt(cert.date),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await deleteCertificate(id);
      toast.success("Certificate deleted");
      fetchCertificates();
    } catch {
      toast.error("Failed to delete certificate");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCert?.title || !currentCert?.issuer || !currentCert?.date) {
      toast.error("Title, Issuer, and Issue Date are required");
      return;
    }

    setSaving(true);
    try {
      await saveCertificate({
        id: currentCert.id,
        title: currentCert.title,
        issuer: currentCert.issuer,
        date: currentCert.date as string,
        credentialId: currentCert.credentialId || undefined,
        url: currentCert.url || undefined,
        description: currentCert.description || undefined,
        order: Number(currentCert.order) || 0,
      });

      toast.success(currentCert.id ? "Certificate updated" : "Certificate added");
      setModalOpen(false);
      fetchCertificates();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save certificate");
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
            <Award size={22} className="text-cyan-400" />
            Manage Certificates
          </h1>
          <p className="text-sm text-gray-400">Manage and showcase your industry certifications</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary py-2.5 px-4 text-sm rounded-xl">
          <Plus size={16} />
          Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-cyan-500" size={24} />
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
          No certificates found. Add your first verification badge!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between border border-white/5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <Calendar size={10} />
                    {formatDateLabel(cert.date)}
                  </span>
                </div>
                <h3 className="text-base font-bold font-['Space_Grotesk'] mb-1.5 leading-snug">{cert.title}</h3>
                {cert.credentialId && (
                  <p className="text-[11px] text-gray-400 mb-2 font-mono break-all bg-white/5 px-2 py-1 rounded">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.description && (
                  <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">{cert.description}</p>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                      <ExternalLink size={12} />
                      Verify Link
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(cert)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 transition-colors" title="Edit">
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && currentCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-white/10 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold font-['Space_Grotesk']">
              {currentCert.id ? "Edit Certificate" : "Add Certificate"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Certificate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={currentCert.title || ""}
                  onChange={(e) => setCurrentCert(prev => ({ ...prev, title: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Issuer</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon Web Services"
                    value={currentCert.issuer || ""}
                    onChange={(e) => setCurrentCert(prev => ({ ...prev, issuer: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Issue Date</label>
                  <input
                    type="month"
                    required
                    value={currentCert.date as string || ""}
                    onChange={(e) => setCurrentCert(prev => ({ ...prev, date: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Credential ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. AWS-123456"
                    value={currentCert.credentialId || ""}
                    onChange={(e) => setCurrentCert(prev => ({ ...prev, credentialId: e.target.value }))}
                    className="form-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
                  <input
                    type="number"
                    required
                    value={currentCert.order === undefined ? "" : currentCert.order}
                    onChange={(e) => setCurrentCert(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Verification URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={currentCert.url || ""}
                  onChange={(e) => setCurrentCert(prev => ({ ...prev, url: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Describe details about this certificate..."
                  value={currentCert.description || ""}
                  onChange={(e) => setCurrentCert(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary py-2 px-4 text-xs rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-4 text-xs rounded-xl flex items-center gap-1.5">
                  {saving ? <RefreshCw className="animate-spin" size={12} /> : <Check size={12} />}
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
