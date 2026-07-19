// ---------------------------------------------------------------------------
// Single source of truth for all site copy. Edit values here — components
// read from this file so you never have to touch JSX to update content.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mamman",
  brand: "MR PG Web Studio",
  role: "Software Engineer / Web & Hardware Developer",
  location: "Nigeria",
  tagline:
    "I design and build fast, intelligent products across web, software, and hardware.",
  email: "hello@mrpgwebstudio.com",
  whatsapp: "2340000000000", // digits only, country code first, no +
  linkedin: "https://linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  cvPath: "/Mamman-CV.pdf",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  { name: "React / Next.js", level: 92 },
  { name: "TypeScript / JavaScript", level: 90 },
  { name: "Node.js / APIs", level: 85 },
  { name: "UI Engineering & Motion", level: 88 },
  { name: "Embedded Systems / IoT", level: 78 },
  { name: "Circuit Design", level: 74 },
  { name: "Cloud & Deployment", level: 80 },
];

export const timeline = [
  {
    year: "2021",
    title: "First line of code",
    body: "Started self-teaching web fundamentals — HTML, CSS, and JavaScript — building small tools for fun.",
  },
  {
    year: "2022",
    title: "First client project",
    body: "Delivered a full restaurant website end-to-end, from design to deployment, for a Lagos-based client.",
  },
  {
    year: "2023",
    title: "Founded MR PG Web Studio",
    body: "Turned freelance work into a studio practice, taking on multi-discipline projects across web and hardware.",
  },
  {
    year: "2024",
    title: "Hardware + software convergence",
    body: "Began building IoT dashboards and embedded systems alongside web products, bridging software and hardware.",
  },
  {
    year: "2025",
    title: "Studio growth",
    body: "Expanded into POS systems, e-commerce platforms, and long-term client partnerships.",
  },
  {
    year: "Now",
    title: "Building this portfolio",
    body: "Consolidating everything into one system — the site you're looking at.",
  },
];

export const services = [
  {
    title: "Web Development",
    description:
      "Production-grade websites and web apps built with modern frameworks — fast, accessible, and easy to maintain.",
    points: ["Next.js / React builds", "E-commerce & checkout flows", "API integration"],
  },
  {
    title: "Web Design",
    description:
      "Interface and interaction design that balances brand identity with usability — from wireframe to polished UI.",
    points: ["Design systems", "Motion & micro-interactions", "Responsive layouts"],
  },
  {
    title: "Software Engineering",
    description:
      "Backend systems, dashboards, and internal tools engineered for reliability at real-world scale.",
    points: ["Dashboards & analytics", "Database architecture", "Systems integration"],
  },
  {
    title: "Hardware Engineering",
    description:
      "Embedded systems and IoT devices — from circuit design to the software that talks to them.",
    points: ["Circuit design", "IoT firmware", "Sensor networks"],
  },
];

export const experience = [
  {
    range: "2023 — Present",
    title: "Founder & Lead Engineer",
    org: "MR PG Web Studio",
    body: "Leading end-to-end delivery of client websites, dashboards, and embedded systems.",
    type: "work",
  },
  {
    range: "2022 — 2023",
    title: "Freelance Web Developer",
    org: "Independent / Prestige Development",
    body: "Delivered bespoke websites for clients across hospitality, retail, and services.",
    type: "work",
  },
  {
    range: "2021 — 2022",
    title: "Self-directed study",
    org: "Web & Software Engineering",
    body: "Built foundational skills across the web stack and started shipping personal projects.",
    type: "education",
  },
];

export const projects = [
  {
    slug: "drop",
    title: "Drop",
    category: "Streetwear E-Commerce",
    summary:
      "A full-featured e-commerce platform for a UK streetwear brand — browsing without login, gated checkout, and a multi-step purchase flow.",
    stack: ["Next.js", "Stripe", "Node.js"],
    image: "/images/project-drop.jpg",
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      problem:
        "The brand needed a storefront that felt premium and let visitors browse freely, while keeping checkout secure and account-gated.",
      approach:
        "Built a browse-first architecture: full catalog access without an account, with authentication required only at checkout. Designed a multi-step flow covering address, payment, OTP verification, and confirmation.",
      result:
        "Launched with a smoother purchase funnel and a standalone reviews page that builds trust before checkout.",
    },
  },
  {
    slug: "pulsewatch",
    title: "Pulsewatch",
    category: "IoT Dashboard",
    summary:
      "A real-time monitoring dashboard for IoT sensor networks, visualizing live device data with historical trends.",
    stack: ["React", "WebSockets", "Embedded C"],
    image: "/images/project-pulsewatch.jpg",
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      problem:
        "Field devices generated continuous sensor data with no accessible way to monitor status or catch anomalies.",
      approach:
        "Paired custom firmware with a live dashboard using WebSocket streaming, giving operators real-time visibility and historical charts.",
      result:
        "Reduced response time to device faults and gave the client a single pane of glass across their sensor fleet.",
    },
  },
  {
    slug: "counter",
    title: "Counter",
    category: "Point of Sale System",
    summary:
      "A point-of-sale system built for small retail operations — fast checkout, inventory tracking, and daily reporting.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: "/images/project-counter.jpg",
    demoUrl: "#",
    githubUrl: "#",
    caseStudy: {
      problem:
        "Small retailers needed a POS that worked offline-first and didn't require expensive hardware.",
      approach:
        "Designed a lightweight web-based POS with local caching, barcode support, and end-of-day reporting built in.",
      result:
        "Cut checkout time significantly and gave owners clear daily sales visibility for the first time.",
    },
  },
];

// Knowledge grounding for the AI assistant — kept separate from UI copy so it
// can be as detailed as needed without bloating the visible page.
export const assistantKnowledge = `
You are the AI assistant embedded in ${profile.name}'s portfolio website (${profile.brand}).
Answer questions about ${profile.name}, their skills, services, and projects using only the
information below. Be concise, warm, and confident. If asked something outside this scope,
say you don't have that information and suggest contacting ${profile.name} directly via the
contact section.

ROLE: ${profile.role}, based in ${profile.location}.
TAGLINE: ${profile.tagline}

SKILLS: ${skills.map((s) => s.name).join(", ")}

SERVICES:
${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

PROJECTS:
${projects
  .map(
    (p) =>
      `- ${p.title} (${p.category}): ${p.summary} Stack: ${p.stack.join(", ")}.`
  )
  .join("\n")}

EXPERIENCE:
${experience.map((e) => `- ${e.range}: ${e.title} at ${e.org}.`).join("\n")}

CONTACT: Email ${profile.email}, WhatsApp available, LinkedIn and GitHub linked in the
contact section of the site.
`;
