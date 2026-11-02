"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

const NAV_BUTTON =
  "absolute top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors";

/**
 * Vollbild-Ansicht für Screenshots: Wischen (Handy), Pfeile, Pfeiltasten, Escape.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  altFor,
  labels,
}: {
  images: StaticImageData[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  altFor: (index: number) => string;
  labels: { close: string; previous: string; next: string };
}) {
  const [direction, setDirection] = useState(0);
  const open = index !== null;
  const count = images.length;

  const go = (step: number) => {
    if (index === null || count < 2) return;
    setDirection(step);
    onIndexChange((index + step + count) % count);
  };

  // Tastatur + Scroll-Sperre, solange offen
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={altFor(index)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            aria-label={labels.close}
            autoFocus
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {count > 1 && (
            <>
              <p className="absolute top-6 left-1/2 -translate-x-1/2 sm:top-8 text-white/60 text-sm tabular-nums">
                {index + 1} / {count}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={labels.previous}
                className={`${NAV_BUTTON} left-2 sm:left-6`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={labels.next}
                className={`${NAV_BUTTON} right-2 sm:right-6`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <Image
                src={images[index]}
                alt={altFor(index)}
                sizes="95vw"
                placeholder="blur"
                draggable={false}
                className="max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl shadow-2xl select-none pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
