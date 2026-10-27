export type EventPhoto = { file: string /* filename inside src/assets/events/ */; alt: string };
export type SiteEvent = {
  name: string;
  place: string;
  date: string; // YYYY-MM
  url?: string;
  talk?: string; // title of the talk given there, shown as a badge
  photos?: EventPhoto[];
};

export const events: SiteEvent[] = [
  {
    name: "Swetugg",
    place: "Stockholm",
    date: "2027-02",
    url: "https://www.swetugg.se/stockholm/2027#speaker-sara-gowen", // her entry on the speakers list
    talk: "How to sneak a real database into a unit(ish) test",
  },
  {
    name: "dotnetsheff",
    place: "Sheffield",
    date: "2026-07",
    url: "https://www.meetup.com/dotnetsheff/events/313824606/", // the event listing, names her as speaker
    talk: "Power up your Entity Framework testing with Testcontainers",
  },
  {
    name: "DDD South West",
    place: "Bristol",
    date: "2026-05",
    talk: "Productivity hacks for clutterbrained devs",
  },
  {
    name: "Digital Taunton Tech",
    place: "Taunton",
    date: "2020-03",
    talk: "Frontend testing with Cypress",
  },
];

/** Newest first. `upcoming` is true when the event month is the current month or later. */
export function sortedEvents(now: Date): (SiteEvent & { upcoming: boolean })[] {
  const month = now.toISOString().slice(0, 7);
  return [...events]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((e) => ({ ...e, upcoming: e.date >= month }));
}
