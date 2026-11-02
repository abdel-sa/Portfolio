import { Star, Brain, Database, Globe, TrendingUp, Shield, ShieldCheck, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { Certificate } from "@/lib/certificates";

export const PROJECT_ICONS: Record<Project["icon"], LucideIcon> = {
  Star,
  Brain,
  Database,
  Globe,
  TrendingUp,
  Shield,
};

export const CERTIFICATE_ICONS: Record<Certificate["icon"], LucideIcon> = {
  ShieldCheck,
  Award,
};
