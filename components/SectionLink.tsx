"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { SectionId } from "@/lib/site";

/**
 * Link zu einem Abschnitt der Startseite. Auf der Startseite wird weich gescrollt,
 * auf Unterseiten wird zur Startseite mit Anker navigiert.
 */
export function SectionLink({
  id,
  className,
  onNavigate,
  ariaLabel,
  children,
}: {
  id: SectionId;
  className?: string;
  onNavigate?: () => void;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={`/#${id}`}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}
