/**
 * Single source of truth for every piece of business content on the site.
 * Vysan: edit this file to change copy, pricing or links — nothing else needs touching.
 */

export const site = {
  name: "HOTTWIREE",
  /**
   * Tagline options considered — the first is the one in use.
   * Swap `tagline` to any of the others (or your own) and the whole site follows.
   *  1. "Websites for businesses that can't be found."   ← in use
   *  2. "Built properly. Live in five days."
   *  3. "Wired for business. Built in Durban."
   *  4. "A real website, for what a template costs."
   */
  tagline: "Websites for businesses that can't be found.",
  description:
    "HOTTWIREE builds custom websites for South African businesses. R3,300 flat, live in 5 business days, 21 days free support on every build. Durban-based freelance developer Vysan Chellan.",
  url: "https://hottwiree.vercel.app",
  locale: "Durban, KwaZulu-Natal · South Africa",
  instagram: {
    handle: "@hott_wiree",
    url: "https://instagram.com/hott_wiree",
  },
} as const;

export const owner = {
  name: "Vysan Chellan",
  age: 22,
  role: "Freelance Developer",
  school: "Richfield Graduate Institute of Technology",
  year: "Final year",
  base: "Durban, KZN",
} as const;

/** Quoted turnaround, used in the spec band, pricing and process copy. */
export const turnaround = {
  value: "5",
  unit: "business days",
  label: "5 business days",
  detail: "From go-ahead to live, once I have your content.",
} as const;

const WHATSAPP_MESSAGE =
  "Hi Vysan, I saw your site and want to talk about a website for my business.";

export const contact = {
  phoneDisplay: "083 855 5008",
  phoneIntl: "+27 83 855 5008",
  whatsapp: `https://wa.me/27838555008?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  email: "chellanvysan@gmail.com",
  mailto: `mailto:chellanvysan@gmail.com?subject=${encodeURIComponent(
    "Website enquiry — via hottwiree",
  )}&body=${encodeURIComponent(
    "Hi Vysan,\n\nI saw your site and want to talk about a website for my business.\n\nMy business:\nWhat I need:\n",
  )}`,
} as const;

export type Project = {
  slug: string;
  name: string;
  sector: string;
  /** What this build was made to demonstrate. */
  blurb: string;
  /** Two or three build highlights, shown as mono chips. */
  tags: readonly string[];
  url: string;
  shot: string;
};

/**
 * These are demonstration builds, not client work.
 *
 * Every one is real, deployed and fully working — but each was built to show a
 * standard, using an invented business, rather than delivered to a paying
 * owner. Nothing on this site should imply otherwise: it isn't true yet, and a
 * client who finds out later has every reason to stop trusting the rest.
 */
export const projects: readonly Project[] = [
  {
    slug: "virelle",
    name: "Virelle",
    sector: "Property · Listings",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A listings build: filterable inventory, light and dark modes, and an enquiry path that survives a long browse.",
    tags: ["Filterable listings", "Light / dark", "Enquiry flow"],
    url: "https://sales-wb4k.vercel.app/",
    shot: "/work/virelle.webp",
  },
  {
    slug: "rjs",
    name: "RJ's Guesthouse",
    sector: "Hospitality · Bookings",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A booking build: rooms, amenities and reviews arranged to get someone from arriving to messaging in one tap.",
    tags: ["WhatsApp bookings", "Gallery", "Reviews + map"],
    url: "https://rjs-guesthouse.vercel.app/",
    shot: "/work/rjs.webp",
  },
  {
    slug: "topnotch",
    name: "Top Notch Creations",
    sector: "Trades · Quotes",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A trades build: eight services laid out without clutter, priced packages, and a quote request that takes seconds.",
    tags: ["Service grid", "Priced packages", "Quote funnel"],
    url: "https://top-notch-pi.vercel.app/",
    shot: "/work/topnotch.webp",
  },
  {
    slug: "junes",
    name: "June's Studio",
    sector: "Creative · Catalogue",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A catalogue build: individual items with prices and sold states, plus a commission enquiry for everything else.",
    tags: ["Catalogue", "Sold states", "Commission form"],
    url: "https://junes-studio.vercel.app/",
    shot: "/work/junes.webp",
  },
  {
    slug: "zinnia",
    name: "Zinnia Nursery",
    sector: "Childcare · Enquiries",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A trust build: warm, parent-facing, with the details a parent actually checks before booking a tour.",
    tags: ["Programmes", "Trust cues", "Book-a-tour CTA"],
    url: "https://daycare-seven-ruby.vercel.app/",
    shot: "/work/zinnia.webp",
  },
];

export const pricing = {
  standard: {
    id: "standard",
    label: "Standard Landing Page Site",
    price: 3300,
    priceLabel: "R3,300",
    cadence: "once-off",
    summary:
      "A complete, professionally designed landing page website for your business.",
    includes: [
      "Full landing page site, designed around your business",
      "Built custom — no drag-and-drop template",
      "Mobile-first: right on the phone your customers actually use",
      "Fast load times and clean, search-friendly markup",
      "WhatsApp, call and enquiry buttons wired up",
      "Built and live in 5 business days",
    ],
  },
  care: {
    id: "care",
    label: "Care Plan",
    price: 400,
    priceLabel: "R400",
    cadence: "per month",
    optional: true,
    summary: "Ongoing updates, fixes and support after launch.",
    includes: [
      "Ongoing content and copy updates",
      "Fixes when something breaks",
      "Support when you need a hand",
      "Cancel whenever — it’s optional, not a contract",
    ],
  },
  custom: {
    id: "custom",
    label: "Custom Build",
    priceLabel: "Get a quote",
    cadence: "priced per project",
    summary:
      "Need a custom dashboard, extra features, or something more advanced? Get a quote.",
    includes: [
      "Client or admin dashboards",
      "Bookings, logins, payments, databases",
      "Multi-page sites and custom tooling",
      "Anything beyond the standard package",
    ],
  },
  support: {
    days: 21,
    headline: "21 Days Free Support",
    detail:
      "Included automatically with every project — whether you take the Care Plan or not.",
  },
} as const;

/** The four numbers that matter, shown as a static band under the hero. */
export const specs = [
  { value: "R3,300", label: "Once-off, all in" },
  { value: turnaround.label, label: "Build to live" },
  { value: "21 days", label: "Free support after launch" },
  { value: "R400 / mo", label: "Care plan, optional" },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Chat",
    body: "You message me on WhatsApp. We talk about your business, what you sell, and who you’re trying to reach. No forms, no sales call.",
  },
  {
    n: "02",
    title: "Build",
    body: "I design and build the site custom to your business — five business days from go-ahead, once I have your content. You see it as it comes together and tell me what to change.",
  },
  {
    n: "03",
    title: "Launch",
    body: "The site goes live, wired to your WhatsApp and email so enquiries land straight on your phone.",
  },
  {
    n: "04",
    title: "21 days free",
    body: "Three weeks of free support after launch, on every single build. Care Plan or not — it’s yours.",
  },
] as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Who", href: "#who" },
] as const;
