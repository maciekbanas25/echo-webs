import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import QuoteBuilder from "@/components/QuoteBuilder";
import ContactForm from "@/components/ContactForm";

interface QuoteDialogProps {
  triggerLabel: string;
  triggerClassName?: string;
}

/**
 * Expandable quote panel (cult-ui "expandable screen"): the trigger button
 * morphs OPEN into a fullscreen panel via a shared layoutId. Inside, the quote
 * builder runs first; "Get this quote" swaps the SAME panel to the contact form
 * (carrying the selections) — no navigation, nothing lost.
 *
 * Closing is intentionally instant: we bump the shared layoutId on every close
 * so the departing panel has no partner to morph back into (no reverse-expand,
 * no settle jump). Only the open is animated.
 */
const QuoteDialog = ({ triggerLabel, triggerClassName = "" }: QuoteDialogProps) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState<"quote" | "contact">("quote");
  const [handoff, setHandoff] = useState<{ services: string[]; summary: string }>({
    services: [],
    summary: "",
  });

  const layoutId = `quote-dialog-${cycle}`;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    setStep("quote");
    // New layoutId next time → the closed panel can't morph back into the button.
    setCycle((c) => c + 1);
  };

  const swap = (key: string, children: React.ReactNode) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      {/* Hidden while open: it morphs INTO the panel on open, and on close it
          remounts with a fresh layoutId (cycle) so there's no partner to morph
          back into — instant, jumpless close. */}
      {!open && (
        <motion.button
          type="button"
          layoutId={layoutId}
          onClick={() => setOpen(true)}
          className={triggerClassName}
        >
          {triggerLabel}
        </motion.button>
      )}

      {/* Portal to <body> so the fixed overlay escapes the closer card's
          backdrop-blur/transform (which would otherwise be its containing block). */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Panel — the trigger morphs into this on open via the shared
                layoutId; on close it simply unmounts (no exit animation). */}
            <motion.div
              layoutId={layoutId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[90vh] w-[92vw] max-w-6xl flex-col overflow-hidden rounded-3xl border border-primary/20 bg-background shadow-2xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.18, duration: 0.25 }}
                className="flex-1 overflow-y-auto overscroll-contain"
              >
                <AnimatePresence mode="wait">
                  {step === "quote"
                    ? swap(
                        "quote",
                        <QuoteBuilder
                          embedded
                          onGetQuote={(services, summary) => {
                            setHandoff({ services, summary });
                            setStep("contact");
                          }}
                        />
                      )
                    : swap(
                        "contact",
                        <div className="px-4 py-10 md:px-6">
                          <div className="mx-auto max-w-2xl">
                            <button
                              type="button"
                              onClick={() => setStep("quote")}
                              className="mb-5 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              ← Back to your quote
                            </button>
                            <ContactForm
                              initialServices={handoff.services}
                              initialProjectDetails={handoff.summary}
                            />
                          </div>
                        </div>
                      )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
};

export default QuoteDialog;
