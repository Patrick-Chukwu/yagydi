import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SocialIcon } from "@/components/ui/social-icon";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { board, team, teamNotice, type TeamMember } from "@/content/team";

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-lavender-100 bg-white">
      <ImagePlaceholder label="[Photo coming soon]" />
      <div className="flex flex-1 flex-col p-5">
        <h4 className="text-xl text-wisteria-900">{person.name}</h4>
        <p className="mt-1 text-base text-neutral-80">{person.role}</p>
        <p className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-neutral-80">
          <SocialIcon name="LinkedIn" className="size-4 shrink-0" />
          LinkedIn coming soon
        </p>
      </div>
    </article>
  );
}

export function TeamBoard() {
  return (
    <Section id="team" background="white" labelledBy="team-heading">
      <Container>
        <SectionHeading id="team-heading" title="Team and board" intro={teamNotice} />
        <h3 className="mt-10 text-2xl text-wisteria-900">Team</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <li key={person.id} className="min-w-0">
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-2xl text-wisteria-900">Board of Trustees</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {board.map((person) => (
            <li key={person.id} className="min-w-0">
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
