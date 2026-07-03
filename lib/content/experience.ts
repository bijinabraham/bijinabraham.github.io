export type Role = {
  title: string;
  company: string;
  location: string;
  start: string; // e.g. "2026-01" or "2017"
  end: string | "present";
  bullets: string[];
  awards?: string[];
  isCurrent?: boolean;
};

export const experience: Role[] = [
  {
    title: "Manager, Solutions Engineering",
    company: "Confluent",
    location: "Americas · Remote",
    start: "2026-01",
    end: "present",
    isCurrent: true,
    awards: ["Acq SEM of the Year, Americas", "President's Club FY25"],
    bullets: [
      "Own the SE org for New Logo Acquisition and consumption-based growth across the Americas.",
      "Own forecast accuracy, pipeline health, deal inspection, and strategic opportunity reviews.",
      "Coach, mentor, and develop a diverse team of Solutions Engineers.",
      "Partner with VPs, RSDs, and AEs to align technical strategy and accelerate deal progression.",
      "Oversee customer consumption, production adoption, and value realisation for long-term retention.",
      "Closed $1.1M across 15 new logos, 137% quota every quarter with zero missed quarters.",
    ],
  },
  {
    title: "Team Lead, Solutions Engineering",
    company: "Confluent",
    location: "Americas · Remote",
    start: "2024-01",
    end: "2026-02",
    awards: ["Q1 Key Contributor AMER", "Culture Champion Award"],
    bullets: [
      "Led a 12-member pre-sales SE team across Strategic, Enterprise, Mid-Market, and SMB.",
      "Drove $1.2M in new land and expansion revenue in Q4 FY25.",
      "Sponsored the workstream that delivered 15 reusable enablement artifacts across the SE org.",
      "Built a structured onboarding framework adopted across multiple teams, cut time-to-live by 50%.",
      "Achieved 95% team engagement score, highest in the organisation, in Q2 2025.",
      "Led hiring initiatives to scale the team from 15 to 37 members across AMER, EMEA, APAC.",
    ],
  },
  {
    title: "Solutions Engineer",
    company: "Confluent",
    location: "Global",
    start: "2023",
    end: "2024",
    bullets: [
      "Worked across AMER, EMEA, and APAC on Enterprise and Strategic accounts.",
      "Designed scalable streaming solutions on Confluent Platform and Kafka.",
      "Ran customer and partner workshops on streaming architecture, data integration, best practices.",
    ],
  },
  {
    title: "Senior Consultant",
    company: "Deloitte",
    location: "Remote",
    start: "2022",
    end: "2023",
    bullets: [
      "Drove digital adoption strategies, change management, and enablement program design.",
    ],
  },
  {
    title: "Senior Solutions Engineer",
    company: "Whatfix",
    location: "Bangalore",
    start: "2020",
    end: "2022",
    bullets: [
      "Designed and implemented customised digital adoption solutions.",
      "Trained and mentored junior team members.",
      "Managed projects end to end from scoping to go-live.",
    ],
  },
  {
    title: "Technical Support Engineer",
    company: "HP Inc.",
    location: "Bangalore",
    start: "2017",
    end: "2018",
    bullets: ["Where it started."],
  },
];
