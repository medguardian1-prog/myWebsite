/**
 * Single source of truth for every piece of business content on the site.
 * Vysan: edit this file to change copy, pricing or links — nothing else needs touching.
 */

export const site = {
  name: "HOTTWIREE",
  /**
   * Tagline options considered — the first is the one in use.
   * Swap `tagline` to any of the others (or your own) and the whole site follows.
   *  1. "Websites with a live current."          ← in use
   *  2. "Sites that don't sit still."
   *  3. "Wired for business. Built in Durban."
   *  4. "Your business, fully charged."
   *  5. "Cold outreach. Hot websites."
   */
  tagline: "Websites with a live current.",
  description:
    "HOTTWIREE builds fast, custom websites for South African businesses. R3,300 flat, live in days, 21 days free support on every build. Durban-based freelance developer Vysan Chellan.",
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
  /** Short line describing the kind of business this was built for. */
  blurb: string;
  /** Two or three build highlights, shown as mono chips. */
  tags: readonly string[];
  url: string;
  shot: string;
  year: string;
};

export const projects: readonly Project[] = [
  {
    slug: "virelle",
    name: "Virelle",
    sector: "Luxury real estate",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A high-end property brokerage: filterable listings, editorial photography and a discreet enquiry flow.",
    tags: ["Listings + filters", "Light / dark mode", "Editorial motion"],
    url: "https://sales-wb4k.vercel.app/",
    shot: "/work/virelle.webp",
    year: "2026",
  },
  {
    slug: "rjs",
    name: "RJ's Guesthouse",
    sector: "Hospitality · Durban",
    // TODO: Vysan confirm/replace this description
    blurb:
      "Self-catering studio apartments in Parlock. Rooms, amenities, real reviews and a one-tap WhatsApp booking.",
    tags: ["WhatsApp bookings", "Gallery", "Reviews + map"],
    url: "https://rjs-guesthouse.vercel.app/",
    shot: "/work/rjs.webp",
    year: "2026",
  },
  {
    slug: "topnotch",
    name: "Top Notch Creations",
    sector: "Renovations & mobile homes",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A Cape Town trades business running eight services under one roof, with priced packages and a quote funnel.",
    tags: ["Service grid", "Pricing packages", "Quote funnel"],
    url: "https://top-notch-pi.vercel.app/",
    shot: "/work/topnotch.webp",
    year: "2026",
  },
  {
    slug: "junes",
    name: "June's Studio",
    sector: "Artist · Creative studio",
    // TODO: Vysan confirm/replace this description
    blurb:
      "An original-artwork studio selling one-of-one drawings, with a collection wall and commission enquiries.",
    tags: ["Collection wall", "Sold states", "Commission form"],
    url: "https://junes-studio.vercel.app/",
    shot: "/work/junes.webp",
    year: "2026",
  },
  {
    slug: "zinnia",
    name: "Zinnia Nursery",
    sector: "Childcare · Middelburg",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A warm, parent-facing daycare site built to win tours: programmes, daily routine and a booking CTA.",
    tags: ["Programmes", "Parent trust cues", "Book-a-tour CTA"],
    url: "https://daycare-seven-ruby.vercel.app/",
    shot: "/work/zinnia.webp",
    year: "2026",
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
      "Mobile-first: looks right on the phone your customers actually use",
      "Fast load times and clean, search-friendly markup",
      "WhatsApp, call and enquiry buttons wired up",
      "Deployed live and handed over",
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

export const processSteps = [
  {
    n: "01",
    title: "Chat",
    body: "You message me on WhatsApp. We talk about your business, what you sell, and who you’re trying to reach. No forms, no sales call.",
  },
  {
    n: "02",
    title: "Build",
    body: "I design and build the site custom to your business. You see it as it comes together and tell me what to change.",
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
