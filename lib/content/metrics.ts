export type Metric = {
  label: string;
  value: string; // may include HTML-ish markers like <em>X</em> to italicise the number
  caption: string;
};

export const metrics: Metric[] = [
  { label: "ARR closed",           value: "<em>$1.1</em>M",  caption: "15 new logos, current role" },
  { label: "Quota, every quarter", value: "<em>137</em>%",   caption: "zero missed since Jan 2026" },
  { label: "Team scaled",          value: "15 to <em>37</em>", caption: "across AMER, EMEA, APAC" },
  { label: "Time-to-live",         value: "−<em>50</em>%", caption: "via onboarding framework" },
];
