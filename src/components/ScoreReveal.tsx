import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface ScoreItem { emoji: string; label: string; status: "good" | "warning"; }

interface Props {
  title: string;
  score: number;
  items: ScoreItem[];
  source?: string;
  visible: boolean;
}

const ScoreReveal = ({ title, score, items, source, visible }: Props) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!visible) { setDisplayScore(0); return; }
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= score) { setDisplayScore(score); clearInterval(interval); }
      else setDisplayScore(current);
    }, 20);
    return () => clearInterval(interval);
  }, [visible, score]);

  if (!visible) return null;

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-3xl font-bold text-primary">{displayScore}/100</span>
      </div>
      <Progress value={displayScore} className="h-2 mb-4" />
      {source && <p className="text-xs text-muted-foreground mb-3 italic">{source}</p>}
      <p className="text-xs text-muted-foreground mb-2 font-medium">Powered by your connected data:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {items.map((item, i) => (
          <span key={i} className={`text-xs ${item.status === "warning" ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
            {item.emoji} {item.label} {item.status === "warning" ? "⚠️" : "✓"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScoreReveal;
