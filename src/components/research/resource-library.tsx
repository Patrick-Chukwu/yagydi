"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProgramme, programmes, type ProgrammeSlug } from "@/content/programmes";
import { resourceTypes, resources, type ResourceType } from "@/content/resources";
import { isPlaceholderUrl } from "@/lib/external-url";
import { formatDisplayDate } from "@/lib/format-date";
import { cn, focusRing } from "@/lib/utils";

type TypeFilter = ResourceType | "all";
type ProgrammeFilter = ProgrammeSlug | "all";

type ResourceLibraryProps = {
  initialProgramme?: string;
};

function isProgrammeSlug(value: string | undefined): value is ProgrammeSlug {
  return programmes.some((programme) => programme.slug === value);
}

export function ResourceLibrary({ initialProgramme }: ResourceLibraryProps) {
  const startingProgramme = isProgrammeSlug(initialProgramme) ? initialProgramme : "all";
  const [type, setType] = useState<TypeFilter>("all");
  const [programme, setProgramme] = useState<ProgrammeFilter>(startingProgramme);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (type !== "all" && resource.type !== type) return false;
      if (programme !== "all" && resource.programme !== programme) return false;
      if (!needle) return true;
      const programmeTitle = getProgramme(resource.programme)?.title ?? resource.programme;
      const haystack = `${resource.title} ${resource.summary} ${resource.type} ${programmeTitle}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [programme, query, type]);

  function clearFilters() {
    setType("all");
    setProgramme("all");
    setQuery("");
  }

  return (
    <div className="min-w-0">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
        <div className="min-w-0">
          <label htmlFor="resource-search" className="text-sm font-bold text-wisteria-900">
            Search
          </label>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            placeholder="Search titles and summaries"
            className={cn(
              "mt-2 h-12 w-full max-w-xl rounded-full border-2 border-lavender-100 bg-white px-4 text-base text-foreground placeholder:text-neutral-60",
              focusRing,
            )}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="resource-programme" className="text-sm font-bold text-wisteria-900">
            Programme
          </label>
          <select
            id="resource-programme"
            value={programme}
            onChange={(event) => {
              const value = event.target.value;
              setProgramme(value === "all" || isProgrammeSlug(value) ? value : "all");
            }}
            className={cn(
              "mt-2 h-12 w-full rounded-full border-2 border-lavender-100 bg-white px-4 text-base text-foreground",
              focusRing,
            )}
          >
            <option value="all">All programmes</option>
            {programmes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-6 min-w-0 border-0 p-0">
        <legend className="text-sm font-bold text-wisteria-900">Type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <TypeButton current={type} value="all" onSelect={setType}>
            All types
          </TypeButton>
          {resourceTypes.map((item) => (
            <TypeButton key={item} current={type} value={item} onSelect={setType}>
              {item}
            </TypeButton>
          ))}
        </div>
      </fieldset>

      <p className="mt-6 text-sm font-semibold text-neutral-80" aria-live="polite">
        {filtered.length === 1 ? "1 resource" : `${filtered.length} resources`}
      </p>

      {filtered.length === 0 ? (
        <div role="status" className="mt-4 rounded-3xl border-2 border-dashed border-lavender-100 bg-white px-5 py-10 text-center">
          <p className="text-lg font-bold text-wisteria-900">No resources match these filters.</p>
          <p className="mt-2 text-base text-neutral-80">
            Try another word, or clear the filters to see every placeholder.
          </p>
          <Button type="button" variant="outline" className="mt-5" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4">
          {filtered.map((resource) => {
            const programmeTitle = getProgramme(resource.programme)?.title ?? resource.programme;
            const fileReady = !isPlaceholderUrl(resource.fileUrl);
            return (
              <li key={resource.id} className="min-w-0">
                <article className="min-w-0 rounded-3xl border border-lavender-100 bg-white p-5 sm:p-6">
                  <p className="text-sm font-bold text-wisteria-700">{resource.type}</p>
                  <h3 className="mt-2 text-2xl text-balance text-wisteria-900">{resource.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-neutral-80">
                    <time dateTime={resource.date}>{formatDisplayDate(resource.date)}</time>
                    <span aria-hidden="true"> · </span>
                    <span>{programmeTitle}</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-80">{resource.summary}</p>
                  <div className="mt-4">
                    {fileReady ? (
                      <Button
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                      >
                        Open file
                      </Button>
                    ) : (
                      <p className="text-sm font-semibold text-neutral-80">File coming soon</p>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function TypeButton({
  current,
  value,
  onSelect,
  children,
}: {
  current: TypeFilter;
  value: TypeFilter;
  onSelect: (value: TypeFilter) => void;
  children: string;
}) {
  const selected = current === value;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(value)}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border-2 px-4 py-2 text-sm font-bold",
        selected
          ? "border-wisteria-100 bg-wisteria-100 text-white"
          : "border-lavender-100 bg-white text-wisteria-900",
        focusRing,
      )}
    >
      {children}
    </button>
  );
}
