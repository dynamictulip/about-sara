# Sara Gowen's site

My personal portfolio: one page about me, my talks and my volunteering, with a button to say hello on LinkedIn. Built with [Astro](https://astro.build) and hosted on GitHub Pages.

**This is my personal site, so I'm not accepting contributions.** Please don't open issues or pull requests.

## Running it on my machine

```bash
npm install
npm run dev      # the site at http://localhost:4321, updates as I edit
npm run build    # the finished site, written to dist/
```

## Changing things

| What | Where |
| --- | --- |
| The words about me, the hero line, my topics and my links | `src/data/profile.ts` |
| Events and the talk shown on each one | `src/data/events.ts` |
| The volunteering timeline | `src/data/volunteering.ts` |
| My photo | `src/assets/sara.jpg` (replace it, keeping the name) |
| Event photos | `src/assets/events/` |

**Events.** Each event is one entry with a `name`, a `place` and a `date` (as `YYYY-MM`). Add `talk: "Talk title"` to show the talk as a badge, and `url` to make the name a link. They sort themselves newest first, and "upcoming" goes away once the month has passed (the site rebuilds monthly, so that happens on its own).

**Event photos.** Put the image in `src/assets/events/`, then add `photos: [{ file: "name.jpg", alt: "What the photo shows" }]` to that event. Always write real alt text. If the filename is wrong the photo is skipped without a warning, so look at the page after adding one.

**Volunteering.** Each entry has a `start` year, an `end` year, the `period` as it should read, a `role`, and optionally an `org` and a `url`. Every entry becomes a branch with a dot for each year. Years that haven't happened yet are drawn hollow. Within a year, entries that happen later in the year go first.

## Checking accessibility

The site has to meet WCAG 2.2 AA, and the automated checks are only about that:

```bash
npm test                          # colour contrast
npx playwright install chromium   # once
npm run test:a11y                 # axe, keyboard and focus, zoom and text spacing
```

[docs/accessibility.md](docs/accessibility.md) lists what is checked automatically and a short manual checklist (including a screen reader pass) to run before big changes.

## Publishing

Pushing to `main` runs the checks and publishes the site, and a failing check stops it. It also rebuilds on the first of every month.

One-time setup on GitHub: Settings, Pages, Source: **GitHub Actions**. To discourage contributions, also turn off Issues, Discussions and Wikis in the repository settings.

The site's address is set in `.github/workflows/deploy.yml` (`SITE_URL` and `BASE_PATH`), because it isn't secret. If I rename the repository or move to a custom domain, I change those two lines.
