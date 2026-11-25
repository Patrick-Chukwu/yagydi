export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string;
};

export const teamNotice =
  "A well rounded team of young people with diverse skills and experiences, working together to achieve our mission.";

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
