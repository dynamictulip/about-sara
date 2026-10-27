export type Volunteering = {
  start: number; // first year, e.g. 2016
  end: number; // last year; years after the current one are drawn as hollow (upcoming) dots
  period: string; // how the dates read, shown under the label, e.g. "2026, 2027" or "2022 - present"
  role: string;
  org?: string; // omit when the role phrase says it all, e.g. "STEM Ambassador and Code Club organiser"
  url?: string;
};

/**
 * Each entry becomes a branch with one dot per year from start to end.
 * Order matters: newest first, and when two entries have a dot in the same year, the one that
 * happens later in that year comes first so it is drawn above the other.
 */
export const volunteering: Volunteering[] = [
  { start: 2022, end: 2027, period: "2022 - present", role: "Organiser", org: "DDD South West" },
  { start: 2026, end: 2027, period: "2026, 2027", role: "Volunteer", org: "NDC London" },
  { start: 2016, end: 2020, period: "2016 - 2020", role: "Code Club organiser", org: "Taunton Library" },
];
