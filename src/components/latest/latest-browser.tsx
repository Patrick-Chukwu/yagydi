"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { NewsCard } from "@/components/sections/news-card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { postCategories, type Post } from "@/content/posts";
import { formatDisplayDate } from "@/lib/format-date";
import { cn, focusRing } from "@/lib/utils";

const PAGE_SIZE = 4;

const tabs = ["All", ...postCategories] as const;
type Tab = (typeof tabs)[number];

type LatestBrowserProps = {
  posts: readonly Post[];
};

export function LatestBrowser({ posts }: LatestBrowserProps) {
  const [tab, setTab] = useState<Tab>("All");
  const [page, setPage] = useState(1);
  const moreRef = useRef<HTMLHeadingElement>(null);

  const filtered = tab === "All" ? posts : posts.filter((post) => post.category === tab);
  const [featured, ...rest] = filtered;
  const pageCount = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = rest.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function chooseTab(next: Tab) {
    setTab(next);
    setPage(1);
  }

  function changePage(next: number) {
    setPage(next);
    requestAnimationFrame(() => moreRef.current?.focus());
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    chooseTab(nextTab);
    document.getElementById(`posts-tab-${nextTab}`)?.focus();
  }

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Post categories" aria-orientation="horizontal" className="flex flex-wrap gap-2">
        {tabs.map((item, index) => {
          const selected = tab === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              id={`posts-tab-${item}`}
              aria-selected={selected}
              aria-controls="post-results"
              tabIndex={selected ? 0 : -1}
              onClick={() => chooseTab(item)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border-2 px-4 py-2 text-sm font-bold",
                selected
                  ? "border-wisteria-100 bg-wisteria-100 text-white"
                  : "border-lavender-100 bg-white text-wisteria-900",
                focusRing,
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="post-results"
        aria-labelledby={`posts-tab-${tab}`}
        className="mt-8 min-w-0"
      >
        {featured ? <FeaturedPost post={featured} /> : <p>No posts in this category.</p>}

        <h2 ref={moreRef} tabIndex={-1} className="mt-12 text-3xl text-wisteria-900 outline-none">
          More posts
        </h2>
        {visible.length === 0 ? (
          <p className="mt-4 text-base text-neutral-80">No further posts in this category.</p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {visible.map((post) => (
              <li key={post.slug} className="min-w-0">
                <NewsCard
                  title={post.title}
                  excerpt={post.excerpt}
                  href={`/latest/${post.slug}`}
                  date={formatDisplayDate(post.date)}
                  imageLabel={post.imageLabel}
                />
              </li>
            ))}
          </ul>
        )}

        {pageCount > 1 ? (
          <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center gap-2">
            <PageButton disabled={safePage === 1} onClick={() => changePage(safePage - 1)}>
              Previous
            </PageButton>
            {Array.from({ length: pageCount }, (_, index) => {
              const number = index + 1;
              const current = number === safePage;
              return (
                <button
                  key={number}
                  type="button"
                  aria-current={current ? "page" : undefined}
                  aria-label={`Page ${number}`}
                  onClick={() => changePage(number)}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 px-3 text-sm font-bold",
                    current
                      ? "border-wisteria-100 bg-wisteria-100 text-white"
                      : "border-lavender-100 bg-white text-wisteria-900",
                    focusRing,
                  )}
                >
                  {number}
                </button>
              );
            })}
            <PageButton disabled={safePage === pageCount} onClick={() => changePage(safePage + 1)}>
              Next
            </PageButton>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-3xl border border-lavender-100 bg-white shadow-sm">
      <Link
        href={`/latest/${post.slug}`}
        className={cn("grid text-foreground no-underline md:grid-cols-2", focusRing)}
      >
        <ImagePlaceholder label={post.imageLabel} className="rounded-none" />
        <div className="flex min-w-0 flex-col p-6 sm:p-8">
          <p className="text-sm font-bold text-wisteria-700">{post.category}</p>
          <p className="mt-2 text-sm font-semibold text-neutral-80">
            <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
          </p>
          <h2 className="mt-3 text-3xl text-balance text-wisteria-900 sm:text-4xl">{post.title}</h2>
          <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-80">{post.excerpt}</p>
          <span className="mt-6 font-bold text-wisteria-700">Read more</span>
        </div>
      </Link>
    </article>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
}: {
  children: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border-2 border-lavender-100 bg-white px-4 text-sm font-bold text-wisteria-900 disabled:opacity-50",
        focusRing,
      )}
    >
      {children}
    </button>
  );
}
