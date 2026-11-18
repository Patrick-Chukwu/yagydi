import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Scale,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ProgrammeIcon } from "@/content/programmes";

const programmeIcons: Record<ProgrammeIcon, LucideIcon> = {
  Leaf,
  ShieldCheck,
  HeartPulse,
  ScrollText,
  Landmark,
  Scale,
  Stethoscope,
  GraduationCap,
};

export function isProgrammeIcon(name: string): name is ProgrammeIcon {
  return Object.hasOwn(programmeIcons, name);
}

export function ProgrammeGlyph({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  if (!isProgrammeIcon(name)) return null;
  const Icon = programmeIcons[name];
  return <Icon aria-hidden="true" className={className} />;
}
