import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
  words: string[];
  /** Time each word stays before swapping (ms). */
  interval?: number;
  className?: string;
}

/**
 * Cycles through a list of words, fading each one up as it appears. The `key`
 * remount re-triggers the fade-in animation on every swap.
 */
const RotatingWord = ({ words, interval = 2200, className }: RotatingWordProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <span
      key={index}
      className={cn("inline-block animate-fade-in", className)}
      style={{ animationDuration: "0.5s" }}
    >
      {words[index]}
    </span>
  );
};

export default RotatingWord;
