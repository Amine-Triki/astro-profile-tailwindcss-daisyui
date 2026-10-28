export const pricing = {
  lastUpdated: "2026",
  items: [
    { key: "landing", from: 500 },
    { key: "business", from: 900 },
    { key: "ecommerce", from: 2500 },
    { key: "webapp", from: 5000 },
    { key: "mobile", from: 800 },
    { key: "custom", from: null },
  ],
} as const;

export const process = {
  revisionRounds: 2,
} as const;

export const keyFacts = {
  clientAccounts: "Domain, hosting and app-store accounts stay in the client's name.",
  codeOwnership: "Code belongs to the client after final payment.",
  maintenance: "Maintenance after delivery is priced separately.",
  delivery: "Typical delivery: landing page 3–7 days, business website 2–3 weeks.",
} as const;
