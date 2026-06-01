import { cn } from "@/lib/utils";

interface BrowserChromeProps {
  /** Address shown in the fake URL bar, e.g. "echo-webs.com/cafe". */
  url: string;
  /** Smaller variant for use inside cards/grids. */
  compact?: boolean;
  className?: string;
}

/** A reusable macOS-style browser window header (traffic lights + URL bar). */
const BrowserChrome = ({ url, compact = false, className }: BrowserChromeProps) => {
  const dot = compact ? "h-2 w-2" : "h-3 w-3";
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 border-b border-primary/15 bg-secondary/70",
        compact ? "px-3 py-2" : "px-4 py-3",
        className
      )}
    >
      <span className={cn("rounded-full bg-red-400/80", dot)} />
      <span className={cn("rounded-full bg-yellow-400/80", dot)} />
      <span className={cn("rounded-full bg-green-400/80", dot)} />
      <div
        className={cn(
          "mx-auto flex max-w-xs flex-1 items-center justify-center truncate rounded-md border border-border bg-background/70 font-mono text-muted-foreground",
          compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        )}
      >
        {url}
      </div>
    </div>
  );
};

export default BrowserChrome;
