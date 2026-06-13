/**
 * Static, zero-dependency brand backgrounds. The living WebGL shader is reserved
 * for the homepage hero only — every other page gets one of these lighter,
 * distinct treatments so the site doesn't read as one repeated cloud. All stay
 * strictly within the blue (#1A6FD4) → cyan (#00CFFF) brand range and fade out
 * via a radial mask so text stays readable.
 */

type Variant = "grid" | "dots" | "beams" | "glow";

const AuroraBackdrop = ({
  variant = "glow",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
  >
    {variant === "grid" && (
      <>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(232,228,217,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,228,217,0.05)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_75%_62%_at_50%_0%,#000_28%,transparent_75%)]" />
        <div className="absolute -top-[28%] left-1/2 h-[60vh] w-[85vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,207,255,0.15),transparent_60%)] blur-2xl" />
      </>
    )}

    {variant === "dots" && (
      <>
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(232,228,217,0.11)_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_72%_58%_at_50%_0%,#000_32%,transparent_76%)]" />
        <div className="absolute -top-[22%] left-[42%] h-[52vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,111,212,0.20),transparent_62%)] blur-3xl" />
      </>
    )}

    {variant === "beams" && (
      <>
        <div className="absolute inset-0 [background:repeating-linear-gradient(115deg,transparent,transparent_40px,rgba(0,207,255,0.045)_40px,rgba(0,207,255,0.045)_41px)] [mask-image:radial-gradient(ellipse_82%_62%_at_50%_0%,#000_20%,transparent_74%)]" />
        <div className="absolute -top-[20%] right-[8%] h-[50vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(0,207,255,0.16),transparent_62%)] blur-3xl" />
      </>
    )}

    {variant === "glow" && (
      <>
        <div className="absolute -left-[8%] -top-[22%] h-[58vh] w-[58vh] rounded-full bg-[radial-gradient(circle,rgba(26,111,212,0.22),transparent_62%)] blur-3xl" />
        <div className="absolute -right-[6%] -top-[12%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(0,207,255,0.15),transparent_62%)] blur-3xl" />
      </>
    )}
  </div>
);

export default AuroraBackdrop;
