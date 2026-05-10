"use client";
import { useState, useEffect, useRef } from "react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  skills?: string[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerLabel?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerLabel = "AS",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [radius, setRadius] = useState(210);

  // Refs that RAF reads directly — no React state updates per frame
  const angleRef = useRef(0);
  const radiusRef = useRef(210);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Keep radiusRef in sync
  useEffect(() => { radiusRef.current = radius; }, [radius]);

  // Responsive radius via ResizeObserver
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setRadius(Math.min(210, Math.floor(w / 2) - 52));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // RAF loop — mutates DOM directly, zero React re-renders per frame
  useEffect(() => {
    if (!autoRotate) return;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      angleRef.current = (angleRef.current + delta * 0.006) % 360;

      const r = radiusRef.current;
      const total = timelineData.length;

      timelineData.forEach((item, index) => {
        const el = nodeRefs.current[item.id];
        if (!el) return;
        const angle = ((index / total) * 360 + angleRef.current) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);
        const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2)));
        el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = String(Math.round(100 + 50 * Math.cos(rad)));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [autoRotate, timelineData]);

  // Compute position from current angle (used for static render when paused)
  const getPos = (index: number) => {
    const angle = ((index / timelineData.length) * 360 + angleRef.current) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      zIndex: Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2))),
    };
  };

  const centerViewOnNode = (nodeId: number) => {
    const i = timelineData.findIndex((item) => item.id === nodeId);
    const target = (i / timelineData.length) * 360;
    angleRef.current = (270 - target + 360) % 360;
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { next[parseInt(k)] = false; });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);
        const pulse: Record<number, boolean> = {};
        timelineData.find((item) => item.id === id)?.relatedIds.forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return next;
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return timelineData.find((item) => item.id === activeNodeId)?.relatedIds.includes(itemId) ?? false;
  };

  return (
    <div
      className="w-full h-[420px] sm:h-[580px] flex items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* Center circle */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-600 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-indigo-500/20 animate-ping opacity-60" />
            <div className="absolute w-24 h-24 rounded-full border border-violet-500/10 animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
            <span className="text-white font-bold text-sm tracking-tight relative z-10">{centerLabel}</span>
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/[0.07]"
            style={{ width: radius * 2, height: radius * 2 }}
          />

          {timelineData.map((item, index) => {
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // When paused (expanded state), render with static computed position.
            // When rotating, RAF drives the style directly — initial style seeds the first frame.
            const pos = getPos(index);

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                  // Only transition when paused (expand/collapse) — never during rotation
                  transition: autoRotate ? "none" : "transform 0.5s ease, opacity 0.3s ease",
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Pulse aura */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${isExpanded
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600 border-indigo-400 shadow-lg shadow-indigo-500/40 scale-150"
                      : isRelated
                      ? "bg-indigo-500/30 border-indigo-400 animate-pulse"
                      : "bg-white/[0.05] border-white/20 hover:border-indigo-400/60 hover:bg-indigo-500/10"
                    }
                  `}
                >
                  <Icon size={16} className={isExpanded ? "text-white" : "text-white/70"} />
                </div>

                {/* Label */}
                <div
                  className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300 ${isExpanded ? "text-white scale-110" : "text-white/55"}`}
                >
                  {item.title}
                </div>

                {/* Expanded popup */}
                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-56 bg-[#0a0a0f]/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-xl shadow-indigo-500/10 overflow-visible z-50 p-4">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-px h-3 bg-indigo-500/40" />
                    <p className="text-xs font-semibold text-white/80 mb-3 uppercase tracking-widest">{item.title}</p>
                    {item.skills && item.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded-full text-[11px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-white/55 leading-relaxed">{item.content}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
