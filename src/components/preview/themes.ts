// Outreach preview templates: one art direction per niche, each borrowing the
// look of the matching EchoWebs demo. Palette colours from the hub override
// the defaults so two previews in the same niche don't look identical.

export type PreviewTemplate = "barber" | "detailer" | "cafe" | "photographer" | "generic";

export interface PreviewData {
  name: string;
  town: string;
  nicheLabel: string;
  services: string[];
  address?: string | null;
  phone?: string | null;
  mapsUrl?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  palette?: Partial<Palette>;
  offer?: string | null;
  from?: { name?: string | null; email?: string | null; phone?: string | null };
}

export interface Palette {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
}

export interface Theme {
  palette: Palette;
  display: string; // font-family for headings
  body: string;
  displayClass: string; // extra classes for the display face
  hero: string | null;
  gallery: string[];
  bookLabel: string;
  kicker: (d: PreviewData) => string;
  headline: (d: PreviewData) => string;
  dark: boolean;
}

export const THEMES: Record<PreviewTemplate, Theme> = {
  barber: {
    palette: { bg: "#0d0c0b", surface: "#171513", ink: "#efe8dc", muted: "#a39a8c", accent: "#c8a165" },
    display: "'Bebas Neue', 'Oswald', sans-serif",
    body: "'Hanken Grotesk', system-ui, sans-serif",
    displayClass: "uppercase tracking-[0.02em] leading-[0.86]",
    hero: "/preview-assets/barber-hero.webp",
    gallery: [],
    bookLabel: "Book a chair",
    kicker: (d) => `Barbers · ${d.town}`,
    headline: (d) => d.name,
    dark: true,
  },
  detailer: {
    palette: { bg: "#08090b", surface: "#121418", ink: "#e9edf2", muted: "#8b939e", accent: "#4fd1ff" },
    display: "'Barlow Condensed', 'Oswald', sans-serif",
    body: "'Hanken Grotesk', system-ui, sans-serif",
    displayClass: "uppercase font-extrabold italic tracking-[-0.01em] leading-[0.88]",
    hero: "/preview-assets/detailer-hero.webp",
    gallery: [],
    bookLabel: "Get a quote",
    kicker: (d) => `Detailing & valeting · ${d.town}`,
    headline: (d) => d.name,
    dark: true,
  },
  cafe: {
    palette: { bg: "#f3ece0", surface: "#e9dfcf", ink: "#2f2119", muted: "#7a6556", accent: "#b5532c" },
    display: "'Fraunces', Georgia, serif",
    body: "'Hanken Grotesk', system-ui, sans-serif",
    displayClass: "font-semibold tracking-[-0.03em] leading-[0.92]",
    hero: "/preview-assets/cafe-hero.webp",
    gallery: [],
    bookLabel: "Find us",
    kicker: (d) => `Now pouring in ${d.town}`,
    headline: (d) => d.name,
    dark: false,
  },
  photographer: {
    palette: { bg: "#f7f6f3", surface: "#ecebe6", ink: "#151515", muted: "#6d6b66", accent: "#151515" },
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'Hanken Grotesk', system-ui, sans-serif",
    displayClass: "font-light tracking-[-0.02em] leading-[0.95]",
    hero: "/preview-assets/photo-hero.webp",
    gallery: ["/preview-assets/photo-1.webp", "/preview-assets/photo-2.webp", "/preview-assets/photo-3.webp", "/preview-assets/photo-4.webp"],
    bookLabel: "Check a date",
    kicker: (d) => `Photographer · ${d.town}`,
    headline: (d) => d.name,
    dark: false,
  },
  generic: {
    palette: { bg: "#eeeae2", surface: "#e2ddd2", ink: "#16181d", muted: "#5f625f", accent: "#d4562a" },
    display: "'Bricolage Grotesque', system-ui, sans-serif",
    body: "'Hanken Grotesk', system-ui, sans-serif",
    displayClass: "font-extrabold tracking-[-0.045em] leading-[0.88]",
    hero: null,
    gallery: [],
    bookLabel: "Get in touch",
    kicker: (d) => `${d.nicheLabel} · ${d.town}`,
    headline: (d) => d.name,
    dark: false,
  },
};

const HEX = /^#[0-9a-f]{6}$/i;

/** Merge hub-supplied palette over the template's, accepting only plain hex colours. */
export function resolvePalette(t: Theme, p?: Partial<Palette>): Palette {
  const out = { ...t.palette };
  if (p) for (const k of Object.keys(out) as (keyof Palette)[]) if (typeof p[k] === "string" && HEX.test(p[k]!)) out[k] = p[k]!;
  return out;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
