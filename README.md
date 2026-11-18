# YAGYDI website

Public site for the Young and Gifted Youth Development Initiative (YAGYDI), a youth-led Nigerian NGO. Tagline: People with Purpose. The pages are built. A lot of the copy, photos, numbers, and legal text is still placeholder and must be replaced before launch.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
```

`npm run dev` includes `/styleguide`. A production build returns 404 for that route.

## Content

Editable copy lives in `src/content/`. Import it. Do not paste the same text into components.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, tagline, social links, contact placeholders, impact stats, logo path |
| `about.ts`, `history.ts`, `values.ts`, `team.ts`, `brand.ts`, `reports.ts` | About page |
| `programmes.ts` | Programme list and detail pages |
| `partnership.ts`, `strategic-focus.ts`, `pillars.ts` | Partnership and strategy |
| `posts.ts`, `stories.ts` | Latest news, stories, events, blog |
| `resources.ts` | Research library |
| `opportunities.ts` | Calls on Get Involved |
| `forms.ts` | External form URLs |
| `donate.ts` | Amounts, payment links, bank transfer |
| `legal.ts` | Draft privacy, safeguarding, whistleblowing, and terms |
| `navigation.ts` | Header and footer links |

## Replace placeholders

- **Logo:** add `public/brand/yagydi-logo.png`. Until that file exists, the header and footer show the word YAGYDI. The browser icon is a separate generated mark (crescent and orange square).
- **Photos:** put files in `public/images` and point the relevant content fields at them. Empty slots stay as labelled placeholders.
- **Stats:** `impactStats` in `src/content/site.ts`.
- **Team and board:** `src/content/team.ts`. Every name there is `[Name]` until you replace it.
- **Contacts:** `contact` in `src/content/site.ts` (email, phone, address).
- **RC number:** the footer line in `src/components/layout/footer.tsx` that says `[RC number PLACEHOLDER]`.

Search the repo for `TODO`, `PLACEHOLDER`, and square-bracket tokens before you treat a page as finished. Draft legal pages are marked `[DRAFT – to be reviewed by YAGYDI]` and are not adopted policy.

## Add a news post

In `src/content/posts.ts`, add an object to `posts`:

- `slug` — unique, used in `/latest/[slug]`
- `title`, `excerpt`, `category` (`News`, `Story`, `Event`, or `Blog`)
- `date` — `YYYY-MM-DD`
- `imageLabel` until a photo exists
- `author` — use a real byline; do not invent a person
- `body` — paragraphs
- `registrationUrl` — only for an Event that has a real form

The sitemap picks up the slug on the next build.

## Add a research resource

In `src/content/resources.ts`, add an object to `resources`:

- `id`, `title`, `summary`
- `type` — one of `resourceTypes` (`Policy brief`, `Fact sheet`, `Evidence summary`, `Report`)
- `programme` — a slug from `src/content/programmes.ts`
- `date` — `YYYY-MM-DD`
- `fileUrl` — a real file link. A URL containing `XXXXXX` stays “File coming soon”.

## Environment

Copy `.env.example` if you want a public URL other than the local fallback:

```bash
NEXT_PUBLIC_SITE_URL=https://yagydi.org
```

No trailing slash. Canonical links, the sitemap, and Open Graph use this. If it is unset, the site uses `http://localhost:3000`. Do not commit secrets. `.env.example` is the only env file that belongs in git.

## Forms

Paste a Tally share URL (preferred) or a Google Form URL into `src/content/forms.ts`. Keys: `volunteer`, `partner`, `contact`, `newsletter`, `opportunity`.

For Tally, use `provider: "tally"` and a `https://tally.so/r/…` URL. For Google, use `provider: "google"` and the form’s view URL. Leave `XXXXXX` in the URL until the form is real; the site then shows “Form coming soon” and does not submit anything.

The volunteer form on Get Involved sends a hidden field named `source` with the value `get-involved`. In Tally, add a hidden field with that name if you want the value stored with the response.

## Payments

In `src/content/donate.ts`:

- `paymentLinks.ngnOneTime` and `paymentLinks.ngnMonthly` — Paystack (NGN)
- `paymentLinks.usdOneTime` and `paymentLinks.usdMonthly` — Flutterwave or Stripe (USD)
- `bankTransfer` — bank name, account name, and account number

Links that still contain `XXXXXX` are not shown as live donate buttons.

## Deploy on Vercel

1. Import this repo.
2. Set `NEXT_PUBLIC_SITE_URL` to the live origin, for example `https://yagydi.org`.
3. Deploy.

`npm run build` must pass before you ship. `/styleguide` is not part of the production site and is disallowed in `robots.txt`.

The Open Graph image is generated at build time. It uses the font built into `next/og`, not Outfit, because Outfit is not bundled for that image.
