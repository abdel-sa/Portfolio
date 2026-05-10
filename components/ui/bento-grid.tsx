"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    stat?: string;
    content?: React.ReactNode;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
                        "border border-white/[0.08] bg-white/[0.03]",
                        "hover:border-white/[0.14] hover:-translate-y-0.5 will-change-transform",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                        item.hasPersistentHover && "-translate-y-0.5 border-white/[0.12]"
                    )}
                >
                    {/* Dot-grid shimmer on hover */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-300",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    {/* Gradient border glow */}
                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-white/[0.06] to-transparent transition-opacity duration-300",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        )}
                    />

                    {item.stat ? (
                        /* ── Stat card ── */
                        <div className="relative flex flex-col h-full">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] mb-4">
                                {item.icon}
                            </div>
                            <div className="mt-auto">
                                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-300 to-violet-400 leading-none mb-1">
                                    {item.stat}
                                </div>
                                <div className="text-sm text-white/45 font-medium">{item.title}</div>
                            </div>
                        </div>
                    ) : item.content ? (
                        /* ── Custom-content card ── */
                        <div className="relative flex flex-col gap-3 h-full">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06]">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-white text-[15px]">{item.title}</h3>
                            </div>
                            {item.content}
                        </div>
                    ) : (
                        /* ── Default card ── */
                        <div className="relative flex flex-col gap-3 h-full">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] group-hover:bg-indigo-500/10 transition-colors duration-300">
                                    {item.icon}
                                </div>
                                {item.status !== undefined && (
                                    <span className="text-xs font-medium px-2 py-1 rounded-lg bg-white/[0.07] text-white/50 transition-colors duration-300 group-hover:bg-white/[0.10]">
                                        {item.status}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="font-semibold text-white tracking-tight text-[15px]">
                                    {item.title}
                                    {item.meta && (
                                        <span className="ml-2 text-xs text-white/35 font-normal">{item.meta}</span>
                                    )}
                                </h3>
                                <p className="text-sm text-white/50 leading-snug">{item.description}</p>
                            </div>

                            {(item.tags?.length || item.cta) && (
                                <div className="flex items-center justify-between mt-auto pt-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags?.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] border border-white/[0.08] text-white/50 transition-colors duration-200 hover:bg-indigo-500/10 hover:border-indigo-500/20 hover:text-indigo-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {item.cta && (
                                        <span className="text-xs text-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                                            {item.cta}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export { BentoGrid };
