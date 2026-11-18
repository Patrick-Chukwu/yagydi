import { SDGBadge } from "@/components/ui/sdg-badge";
import type { SdgId } from "@/content/site";
import { sdgById } from "@/content/site";

type ProgrammeSdgsProps = {
  ids: readonly SdgId[];
  tone?: "default" | "inverse";
};

export function ProgrammeSdgs({ ids, tone = "default" }: ProgrammeSdgsProps) {
  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {ids.map((id) => {
        const sdg = sdgById(id);
        return (
          <li key={sdg.id} className="min-w-0">
            <SDGBadge id={sdg.id} name={sdg.name} tone={tone} />
          </li>
        );
      })}
    </ul>
  );
}
