"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Image as ImageIcon,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";


const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Layers },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  if (!mounted) return null;

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Redirect if not authenticated (should be handled by middleware too)
  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020209]">
        <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#020209] text-white">
      {/* Sidebar Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-dark rounded-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="fixed lg:static inset-y-0 left-0 z-40 admin-sidebar flex flex-col h-screen overflow-hidden"
      >
        <div className="p-6 flex items-center gap-3 w-[260px]">
          <div className="w-8 h-8 rounded-lg gradient-purple-blue flex items-center justify-center font-bold text-sm">
            LR
          </div>
          <span className="font-bold tracking-wide">Admin Panel</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 w-[260px] flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 w-[260px]">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
        
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 lg:px-12 backdrop-blur-md z-10 flex-shrink-0">
          <div className="lg:hidden" /> {/* Spacer for mobile menu button */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-400">Logged in as <strong className="text-white">{session?.user?.email}</strong></span>
            <Link 
              href="/" 
              target="_blank"
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
            >
              View Site ↗
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>


    </div>
  );
}
