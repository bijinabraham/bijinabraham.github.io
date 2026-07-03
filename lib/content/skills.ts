export type SkillLevel = 1 | 2 | 3 | 4;

export type Skill = {
  name: string;
  detail?: string; // shown as italic subtitle
  level: SkillLevel;
  sme?: boolean;
  note: string;
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Streaming and data platforms",
    skills: [
      { name: "Apache Kafka", detail: "brokers, clients, connect", level: 4, sme: true, note: "Daily driver for 3+ years. SME across producer and consumer tuning, exactly-once, tiered storage." },
      { name: "Confluent Cloud and Platform", level: 4, sme: true, note: "RBAC, Schema Registry, Stream Governance, ksqlDB, Tableflow." },
      { name: "Apache Flink", detail: "SQL and DataStream", level: 3, note: "Production POCs. Watermarks, state, exactly-once end to end." },
      { name: "CDC", detail: "Debezium, Golden Gate, Fivetran", level: 3, note: "Delivered 5+ enterprise CDC pipelines. Oracle, Postgres, MySQL sources." },
      { name: "GenAI and LLM integration", detail: "agents, RAG, tool use", level: 4, sme: true, note: "SME workstream sponsor. 15 reusable artifacts shipped across the SE org, reuse-tracked." },
    ],
  },
  {
    name: "Cloud and infra",
    skills: [
      { name: "AWS", detail: "EKS, MSK, IAM, S3", level: 3, note: "Primary cloud for customer deployments. Comfortable in console and Terraform." },
      { name: "Kubernetes", level: 3, note: "Deploying Confluent for K8s, operator patterns, resource tuning." },
      { name: "Docker and Compose", level: 3, note: "Local dev environments, demo stacks, CI test rigs." },
    ],
  },
  {
    name: "Languages and tools",
    skills: [
      { name: "Python", level: 3, note: "POCs, integration scripts, enablement artifacts. Daily use." },
      { name: "TypeScript / JavaScript", level: 3, note: "Full-stack for side projects (Next.js, React Native)." },
      { name: "SQL and Streaming SQL", level: 3, note: "Flink SQL, ksqlDB, Snowflake, Postgres." },
    ],
  },
  {
    name: "Leadership and management",
    skills: [
      { name: "People management", level: 4, sme: true, note: "12-member team, 95% engagement score (highest in org)." },
      { name: "Hiring and onboarding", level: 4, sme: true, note: "Scaled team 15 to 37 across 3 theatres. Onboarding framework cut time-to-live 50%." },
      { name: "Coaching and mentorship", level: 4, sme: true, note: "1:1s, career plans, technical uplift. Two direct reports promoted this year." },
    ],
  },
  {
    name: "Go-to-market",
    skills: [
      { name: "MEDDPICC and forecasting", level: 3, note: "Own pipeline health, deal inspection. Zero missed quarters." },
      { name: "Enterprise demos and POCs", level: 4, sme: true, note: "Delivered 100+ enterprise demos. Still runs the technical POCs personally." },
      { name: "Executive communication", level: 3, note: "Regular business reviews with VPs and CXOs." },
    ],
  },
];
