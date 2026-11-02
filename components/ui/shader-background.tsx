"use client";

import { useEffect, useRef, useState } from "react";
import { Warp } from "@paper-design/shaders-react";
import type { ShaderConfig } from "@/lib/shader";

/**
 * Animierter Warp-Shader, der nur läuft, solange er (fast) im Viewport ist.
 * Außerhalb wird die Animation pausiert (speed 0 stoppt den requestAnimationFrame-Loop
 * komplett), das aktuelle Bild bleibt stehen. Sobald man wieder hinscrollt, läuft er weiter.
 *
 * maxPixelCount begrenzt die Renderauflösung. Der Shader ist weich und liegt unter einem
 * dunklen Overlay, eine niedrigere Auflösung ist optisch nicht sichtbar, spart aber
 * auf Geräten mit hoher Pixeldichte (Handy: DPR 3) viel GPU-Last.
 */
export function ShaderBackground({
  shader,
  speed,
  maxPixelCount = 1920 * 1080 / 2,
  className,
}: {
  shader: ShaderConfig;
  speed: number;
  maxPixelCount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={shader.proportion}
        softness={shader.softness}
        distortion={shader.distortion}
        swirl={shader.swirl}
        swirlIterations={shader.swirlIterations}
        shape={shader.shape}
        shapeScale={shader.shapeScale}
        scale={1}
        rotation={0}
        speed={inView ? speed : 0}
        colors={shader.colors}
        minPixelRatio={1}
        maxPixelCount={maxPixelCount}
      />
    </div>
  );
}
