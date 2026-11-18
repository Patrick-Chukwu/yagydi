export type ImpactFigure = {
  figure: string;
  label: string;
};

const impactPattern = /^(\[[^\]]+\]|\d+\+)\s+(.+)$/;

/** Split a content string such as "[X] Schools" without inventing a number. */
export function splitImpactStat(stat: string): ImpactFigure {
  const match = impactPattern.exec(stat);
  if (!match?.[1] || !match[2]) {
    return { figure: stat, label: "" };
  }
  return { figure: match[1], label: match[2] };
}
