"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Send, User, MessageSquare, FileText, MapPin, Clock, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      reset();
      toast.success("Message sent! I'll get back to you soon. 🚀");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const INFO = [
    {
      icon: Mail,
      label: "Email",
      value: "laibarashid2711@gmail.com",
      href: "mailto:laibarashid2711@gmail.com",
      color: "#7c3aed",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lahore, Pakistan",
      href: null,
      color: "#2563eb",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
      color: "#22d3ee",
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <Mail size={12} />
              Get In Touch
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Let&apos;s <span className="gradient-text">Work Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-lg mx-auto text-base"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Have a project in mind? I&apos;m available for freelance work and full-time opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Availability card */}
            <div className="glass-card p-5 sm:p-6 gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full bg-green-400 animate-pulse"
                  style={{ boxShadow: "0 0 10px #4ade80" }}
                />
                <span className="text-sm font-semibold text-green-400">
                  Available for Work
                </span>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                I&apos;m currently open to new opportunities — full-time roles,
                freelance projects, and collaborations.
              </p>
            </div>

            {/* Contact info */}
            {INFO.map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="glass-card p-4 sm:p-5 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p
                    className="text-xs mb-0.5"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-white hover:opacity-80 transition-opacity"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
                  >
                    <CheckCircle size={28} style={{ color: "#4ade80" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost mt-6 text-sm py-2 px-6"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}
                      >
                        <User size={10} className="inline mr-1" />
                        Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Laiba Rashid"
                        className="form-input"
                      />
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}
                      >
                        <Mail size={10} className="inline mr-1" />
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="hello@example.com"
                        className="form-input"
                      />
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <FileText size={10} className="inline mr-1" />
                      Subject
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="Project Inquiry"
                      className="form-input"
                    />
                    {errors.subject && (
                      <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <MessageSquare size={10} className="inline mr-1" />
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="form-input resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
