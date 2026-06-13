import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { isEmbedded } from "@/lib/embed";

export type DemoNavLink = { label: string; href: string };

/** Scroll a same-page anchor into view (Lenis honours native smooth scroll). */
const scrollToHref = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Slim ribbon at the very top marking the page as an EchoWebs demo. It scrolls
 * away (not sticky) so the business site below feels like the real thing.
 * Hidden when the demo is embedded (e.g. previewed inside the EchoWebs site).
 */
export const DemoBar = () => {
  if (isEmbedded) return null;
  return (
    <div className="relative z-50 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-[#080A0F] px-4 py-2 text-center font-satoshi text-[12.5px] text-[#E8E4D9]/65">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00CFFF]" />
        EchoWebs demo — a sample build for a business like this
      </span>
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-[#E8E4D9] hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Portfolio
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-1 font-semibold text-[#00CFFF] underline-offset-4 transition-colors hover:underline"
      >
        Get a site like this <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
};

type DemoNavProps = {
  name: string;
  links: DemoNavLink[];
  cta?: { label: string; href: string };
  icon?: ReactNode;
  rightSlot?: ReactNode;
  /** Wordmark font/size classes. */
  brandClass?: string;
  /** Text colour classes while transparent over the hero. */
  overlayClass?: string;
  /** Bar classes once scrolled (bg / border / text). */
  scrolledClass: string;
  /** Tailwind class for the CTA button. */
  ctaClass?: string;
};

/**
 * Per-business sticky nav: transparent over the hero, themed solid once scrolled.
 * Same-page anchors scroll smoothly; route links use the router.
 */
export const DemoNav = ({
  name,
  links,
  cta,
  icon,
  rightSlot,
  brandClass = "font-clash font-semibold",
  overlayClass = "text-white",
  scrolledClass,
  ctaClass,
}: DemoNavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handle = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) scrollToHref(href);
  };

  const tone = scrolled ? scrolledClass : `bg-transparent ${overlayClass}`;
  const Cta = cta && (
    cta.href.startsWith("#") ? (
      <button onClick={() => handle(cta.href)} className={ctaClass}>
        {cta.label}
      </button>
    ) : (
      <Link to={cta.href} className={ctaClass}>
        {cta.label}
      </Link>
    )
  );

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${tone}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button
          onClick={() => scrollToHref("#top")}
          className={`flex items-center gap-2 text-lg tracking-tight md:text-xl ${brandClass}`}
        >
          {icon}
          {name}
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handle(l.href)}
              className="font-satoshi text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {l.label}
            </button>
          ))}
          {rightSlot}
          {Cta}
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className={`md:hidden ${scrolled ? "" : scrolledClass}`}>
          <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handle(l.href)}
                className="py-2 text-left font-satoshi text-base font-medium"
              >
                {l.label}
              </button>
            ))}
            {rightSlot && <div className="py-2">{rightSlot}</div>}
            {Cta && <div className="pt-2">{Cta}</div>}
          </div>
        </div>
      )}
    </header>
  );
};

type FooterColumn = { title: string; items: ReactNode[] };

type DemoFooterProps = {
  name: string;
  blurb: string;
  columns: FooterColumn[];
  /** Section classes (bg / text). */
  className: string;
  brandClass?: string;
  accentClass?: string;
};

/** Per-business footer so the demo ends like a real site, not the EchoWebs one. */
export const DemoFooter = ({
  name,
  blurb,
  columns,
  className,
  brandClass = "font-clash font-semibold",
  accentClass = "",
}: DemoFooterProps) => (
  <footer className={`px-5 py-16 md:px-10 ${className}`}>
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div className="max-w-xs">
        <div className={`text-2xl ${brandClass} ${accentClass}`}>{name}</div>
        <p className="mt-4 font-satoshi text-sm leading-relaxed opacity-70">
          {blurb}
        </p>
      </div>
      {columns.map((col) => (
        <div key={col.title}>
          <div className="font-satoshi text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
            {col.title}
          </div>
          <ul className="mt-4 space-y-2.5 font-satoshi text-sm opacity-80">
            {col.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mx-auto mt-12 max-w-7xl">
      <div className="h-px w-full bg-current opacity-10" />
      <div className="pt-6 font-satoshi text-xs opacity-50">
        © {new Date().getFullYear()} {name}. Demo site by EchoWebs.
      </div>
    </div>
  </footer>
);
