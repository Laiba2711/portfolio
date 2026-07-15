"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Copy,
  Trash2,
  ExternalLink,
  Search,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  date: string;
}

const STOCK_ASSETS: MediaItem[] = [
  {
    id: "1",
    name: "Unsplash Code Snippet.jpg",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    size: "142 KB",
    type: "image/jpeg",
    date: "2026-07-15",
  },
  {
    id: "2",
    name: "Unsplash Setup Workspace.jpg",
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    size: "198 KB",
    type: "image/jpeg",
    date: "2026-07-15",
  },
  {
    id: "3",
    name: "Unsplash Coding Night.jpg",
    url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
    size: "210 KB",
    type: "image/jpeg",
    date: "2026-07-15",
  },
];

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_media_items");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      localStorage.setItem("portfolio_media_items", JSON.stringify(STOCK_ASSETS));
      setItems(STOCK_ASSETS);
    }
  }, []);

  const saveToLocal = (newItems: MediaItem[]) => {
    localStorage.setItem("portfolio_media_items", JSON.stringify(newItems));
    setItems(newItems);
  };

  const handleMockUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const url = data.get("url") as string;

    if (!name || !url) {
      toast.error("Please fill in all uploader fields");
      return;
    }

    const newItem: MediaItem = {
      id: Date.now().toString(),
      name: name.endsWith(".jpg") || name.endsWith(".png") ? name : `${name}.jpg`,
      url,
      size: `${Math.floor(Math.random() * 300) + 50} KB`,
      type: "image/jpeg",
      date: new Date().toISOString().split("T")[0],
    };

    saveToLocal([newItem, ...items]);
    toast.success("Media item added successfully!");
    e.currentTarget.reset();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this media item?")) return;
    const updated = items.filter((item) => item.id !== id);
    saveToLocal(updated);
    toast.success("Media item removed");
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 font-['Space_Grotesk']">
            <ImageIcon size={22} className="text-purple-400" />
            Media Library
          </h1>
          <p className="text-sm text-gray-400">Upload or link image assets and copy their URLs for use in projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Link New Media */}
        <div className="lg:col-span-1 glass-card p-5 rounded-2xl border border-white/5 space-y-4 h-fit">
          <h3 className="text-base font-bold font-['Space_Grotesk'] flex items-center gap-2">
            <Plus size={16} className="text-purple-400" />
            Add Image Asset
          </h3>
          <p className="text-xs text-gray-400">
            Paste any web image URL (e.g., from Unsplash, Imgur, or Cloudinary) to add it to your asset bank.
          </p>
          <form onSubmit={handleMockUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Asset Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Project Thumbnail"
                className="form-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Image URL</label>
              <input
                type="url"
                name="url"
                required
                placeholder="https://images.unsplash.com/..."
                className="form-input text-sm"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-2.5 text-xs rounded-xl">
              Add Asset
            </button>
          </form>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-10 text-sm"
            />
          </div>

          {filteredItems.length === 0 ? (
            <div className="glass-card p-12 text-center text-gray-400 rounded-2xl">
              No assets matching &quot;{search}&quot; found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="glass-card p-4 rounded-xl flex items-start gap-4 border border-white/5 group">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate pr-6" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                      {item.size} · {item.date}
                    </p>
                    <div className="flex gap-2.5 mt-2">
                      <button
                        onClick={() => handleCopy(item.id, item.url)}
                        className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5"
                      >
                        {copiedId === item.id ? <Check size={11} /> : <Copy size={11} />}
                        Copy URL
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        <ExternalLink size={10} />
                        View
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors ml-auto opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
