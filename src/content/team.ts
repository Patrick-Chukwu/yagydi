export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
};

export const teamNotice =
  "Every name, role, and photo here is a placeholder until the real team and board are published.";

function seats(prefix: string, count: number): TeamMember[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    name: "[Name]",
    role: "[Role]",
  }));
}

// TODO: replace with real content
export const team: readonly TeamMember[] = seats("team", 8);

// TODO: replace with real content
export const board: readonly TeamMember[] = seats("board", 4);
