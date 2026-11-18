export const postCategories = ["News", "Story", "Event", "Blog"] as const;

export type PostCategory = (typeof postCategories)[number];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  /** YYYY-MM-DD */
  date: string;
  imageLabel: string;
  author: string;
  body: readonly string[];
  registrationUrl?: string;
};

// TODO: replace with real content
export const posts = [
  {
    slug: "placeholder-news-1",
    title: "[News title]",
    excerpt: "[TODO: replace with a real news excerpt. This is not published news.]",
    category: "News",
    date: "2026-11-01",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with the first paragraph of a real news piece. This text is not a published article.]",
      "[TODO: replace with a second paragraph. Do not treat this page as a real YAGYDI announcement.]",
    ],
  },
  {
    slug: "placeholder-story-1",
    title: "[Story title]",
    excerpt: "[TODO: replace with a real story excerpt. This is not a participant story.]",
    category: "Story",
    date: "2026-10-15",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with the first paragraph of a real story. No young person is quoted here.]",
      "[TODO: replace with a second paragraph once a real story is cleared for publication.]",
    ],
  },
  {
    slug: "placeholder-event-1",
    title: "[Event title]",
    excerpt: "[TODO: replace with a real event excerpt. This event is not scheduled.]",
    category: "Event",
    date: "2026-09-20",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with a real event description, including when and where it happens.]",
      "[TODO: replace with practical details once registration is actually open.]",
    ],
    // TODO: replace with real content
    registrationUrl: "https://tally.so/r/XXXXXX",
  },
  {
    slug: "placeholder-blog-1",
    title: "[Blog title]",
    excerpt: "[TODO: replace with a real blog excerpt. This is not a published post.]",
    category: "Blog",
    date: "2026-08-01",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with the first paragraph of a real blog post.]",
      "[TODO: replace with a second paragraph. This placeholder is not YAGYDI's view on a topic.]",
    ],
  },
  {
    slug: "placeholder-news-2",
    title: "[News title 2]",
    excerpt: "[TODO: replace with a second news excerpt. This is not published news.]",
    category: "News",
    date: "2026-07-01",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with the first paragraph of a second news piece.]",
      "[TODO: replace with a second paragraph before this is treated as news.]",
    ],
  },
  {
    slug: "placeholder-story-2",
    title: "[Story title 2]",
    excerpt: "[TODO: replace with a second story excerpt. This is not a participant story.]",
    category: "Story",
    date: "2026-06-01",
    imageLabel: "[Image coming soon]",
    author: "[Author name]",
    body: [
      "[TODO: replace with the first paragraph of a second story.]",
      "[TODO: replace with a second paragraph once the story is real and consented.]",
    ],
  },
] as const satisfies readonly Post[];

export function getPostsByDate(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getLatestPosts(count = 3): Post[] {
  return getPostsByDate().slice(0, count);
}

export function getFeaturedPost(): Post {
  const [featured] = getPostsByDate();
  if (!featured) {
    throw new Error("posts.ts needs at least one post.");
  }
  return featured;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
