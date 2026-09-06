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
  /**
   * Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is connected.
   * Everything downstream — canonical tag, Open Graph, sitemap, robots.txt
   * and the structured data Google reads — follows from this one value.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hottwiree.vercel.app",
  locale: "Durban, KwaZulu-Natal · South Africa",
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
    sector: "Property · Private brokerage",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A restraint build: a deliberately small portfolio presented like a private viewing, with a searchable register rather than a property portal.",
    tags: ["Searchable register", "Editorial typography", "Discreet enquiry"],
    url: "https://sales-wb4k.vercel.app/",
  },
  {
    slug: "rjs",
    name: "RJ's Guesthouse",
    sector: "Hospitality · Bookings",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A conversion build: guests pick their dates and nights, see the real total, and get a WhatsApp message with those dates already written in it.",
    tags: ["Stay planner", "Live pricing", "Pre-filled WhatsApp"],
    url: "https://rjs-guesthouse.vercel.app/",
  },
  {
    slug: "topnotch",
    name: "Top Notch Creations",
    sector: "Trades · Quotes",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A spec-sheet build: eight trades set out like a job document, with a scope builder that turns a vague enquiry into a qualified one.",
    tags: ["Scope builder", "Fixed package rates", "Job-sheet layout"],
    url: "https://top-notch-pi.vercel.app/",
  },
  {
    slug: "junes",
    name: "June's Studio",
    sector: "Creative · Gallery",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A materiality build: the work is chalk on black, so the cursor becomes a gallery light that rakes across each piece as you pass it.",
    tags: ["Moving light source", "Hung-wall layout", "Commissions"],
    url: "https://junes-studio.vercel.app/",
  },
  {
    slug: "zinnia",
    name: "Zinnia Nursery",
    sector: "Childcare · Enquiries",
    // TODO: Vysan confirm/replace this description
    blurb:
      "A trust build: a scroll-through of one whole day, drop-off to pickup, answering the question every parent has before they will book a tour.",
    tags: ["A day here", "Routine timeline", "Book-a-tour CTA"],
    url: "https://daycare-seven-ruby.vercel.app/",
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

export type Faq = { q: string; a: string };

/**
 * Objection handling. Also emitted as FAQPage structured data, which is how
 * these can show up as expandable answers directly in Google results.
 *
 * TODO: Vysan — add a payment-terms entry (deposit up front? full on launch?).
 * Deliberately left out rather than invented, because getting it wrong on the
 * page is worse than not answering it.
 */
export const faqs: readonly Faq[] = [
  {
    q: "Do I own the site when it's done?",
    a: "Yes. The code and the content are yours — ask me for them at any time and I'll hand the whole project over. The domain is bought in your name from day one, so that stays yours permanently as well.",
  },
  {
    q: "What does hosting cost?",
    a: "Nothing. I host your site on my own Vercel account, so there is no hosting bill and nothing for you to set up or keep an eye on. If you ever want it moved onto your own account, I hand over the code and help you repoint the domain — nothing is held hostage.",
  },
  {
    q: "And the domain?",
    a: "You buy that one yourself, in your own name — a .co.za is roughly R100 to R200 a year. I'll tell you exactly which to get and the two settings to change so I can connect it. Owning it yourself means it stays yours, whoever builds your next site.",
  },
  {
    q: "What if I don't like how it looks?",
    a: "You'll see it as it comes together, not at the end. Changes during the build are part of the R3,300 — we keep going until it's right.",
  },
  {
    q: "What happens after the 21 days of free support?",
    a: "Nothing changes. Your site keeps running exactly as it is. After that you either take the R400/month Care Plan, or just message me when you need something and I'll quote it.",
  },
  {
    q: "What do you need from me?",
    a: "Your services and prices, your contact details, any photos you have, and a logo if you've got one. That's what keeps it to five business days — the clock starts when I have your content.",
  },
  {
    q: "I already have a website.",
    a: "Then send it to me and I'll tell you straight whether it needs rebuilding or just fixing. If it only needs fixing, I'll say so rather than sell you a rebuild.",
  },
];

/**
 * Real client testimonials only.
 *
 * The section renders nothing while this is empty, which is deliberate: the
 * five builds on this site are demos, so there is no one to quote yet. The
 * day a paying client says something good, put it here with their real name
 * and business — that single entry will be worth more than any of the design
 * on this page.
 */
export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  /** Optional link to their live site. */
  url?: string;
};

export const testimonials: readonly Testimonial[] = [];

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
