"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Briefcase, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] as const } },
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="kontakt" className="relative py-24 bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">
                        {t.contact.sectionTitle}
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                        {t.contact.heading}
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
                    {/* Form */}
                    <motion.form
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-white/50 text-sm mb-1.5" htmlFor="name">
                                {t.contact.nameLabel}
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                disabled={status === "sending" || status === "success"}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
                                placeholder={t.contact.namePlaceholder}
                            />
                        </div>
                        <div>
                            <label className="block text-white/50 text-sm mb-1.5" htmlFor="email">
                                {t.contact.emailLabel}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                disabled={status === "sending" || status === "success"}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
                                placeholder={t.contact.emailPlaceholder}
                            />
                        </div>
                        <div>
                            <label className="block text-white/50 text-sm mb-1.5" htmlFor="message">
                                {t.contact.messageLabel}
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                disabled={status === "sending" || status === "success"}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none disabled:opacity-50"
                                placeholder={t.contact.messagePlaceholder}
                            />
                        </div>

                        {/* Status feedback */}
                        {status === "success" && (
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                {t.contact.success}
                            </div>
                        )}
                        {status === "error" && (
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {t.contact.error}
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={status === "sending" || status === "success"}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-60 disabled:cursor-not-allowed self-start"
                            >
                                {status === "sending" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                {status === "sending" ? t.contact.sending : t.contact.sendButton}
                            </button>
                            {status === "error" && (
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="text-sm text-white/40 hover:text-white transition-colors"
                                >
                                    {t.contact.sendButton}
                                </button>
                            )}
                        </div>
                    </motion.form>

                    {/* Sidebar */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span className="text-white/50 text-xs uppercase tracking-widest">{t.contact.emailLabel}</span>
                            </div>
                            <a
                                href="mailto:rahman.salama78@gmail.com"
                                className="text-white/80 text-sm hover:text-white transition-colors break-all"
                            >
                                rahman.salama78@gmail.com
                            </a>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                <span className="text-white/50 text-xs uppercase tracking-widest">{t.contact.locationLabel}</span>
                            </div>
                            <p className="text-white/80 text-sm">{t.contact.location}</p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                            <div className="flex items-center gap-3 mb-3">
                                <Briefcase className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span className="text-white/50 text-xs uppercase tracking-widest">{t.contact.availabilityLabel}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    <span className="text-white/70 text-sm">{t.contact.avail1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    <span className="text-white/70 text-sm">{t.contact.avail2}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
