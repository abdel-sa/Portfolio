"use client";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

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
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState(210);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const current = timelineData.find((item) => item.id === id);
        const pulse: Record<number, boolean> = {};
        current?.relatedIds.forEach((relId) => { pulse[relId] = true; });
        setPulseEffect(pulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = Number((radius * Math.cos(radian) + centerOffset.x).toFixed(2));
    const y = Number((radius * Math.sin(radian) + centerOffset.y).toFixed(2));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number(
      Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))).toFixed(3)
    );
    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const current = timelineData.find((item) => item.id === activeNodeId);
    return current ? current.relatedIds.includes(itemId) : false;
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
          style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
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
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
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

                {/* Expanded skills popup */}
                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-56 bg-[#0a0a0f]/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-xl shadow-indigo-500/10 overflow-visible z-50 p-4">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-px h-3 bg-indigo-500/40" />
                    <p className="text-xs font-semibold text-white/80 mb-3 uppercase tracking-widest">{item.title}</p>
                    {item.skills && item.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full text-[11px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-200"
                          >
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
