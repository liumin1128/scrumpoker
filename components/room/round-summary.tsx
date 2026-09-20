import {
  ArrowDownLeft,
  ArrowUpRight,
  ChartNoAxesColumn,
  Equal,
  TrendingUp,
} from "lucide-react";
import type { Participant } from "@/app/room/[roomID]/[username]/types";
import {
  calculateAverageScore,
  findMaxScore,
  findMinScore,
  findMostChosenScore,
} from "@/app/room/[roomID]/[username]/utils";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RoundSummary({
  participants,
  revealed,
}: {
  participants: Participant[];
  revealed: boolean;
}) {
  const scores = revealed
    ? participants.map((person) => person.voteValue || 0)
    : [];
  const stats = [
    {
      label: "Average",
      value: calculateAverageScore(scores),
      icon: TrendingUp,
    },
    {
      label: "Most chosen",
      value: findMostChosenScore(scores).join(", "),
      icon: Equal,
    },
    { label: "Highest", value: findMaxScore(scores), icon: ArrowUpRight },
    { label: "Lowest", value: findMinScore(scores), icon: ArrowDownLeft },
  ];

  return (
    <Card
      className="overflow-hidden rounded-2xl shadow-none"
      aria-label="Round summary"
    >
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <ChartNoAxesColumn className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-xs font-semibold">Round summary</h2>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border/70" aria-live="polite">
        {stats.map(({ label, value, icon: Icon }, index) => (
          <div
            key={label}
            className={cn(
              "min-w-0 bg-card p-5",
              index === 0 && revealed && "bg-[#f0f5ee] dark:bg-secondary",
            )}
          >
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Icon className="size-3" aria-hidden="true" />
              {label}
            </p>
            <p
              className={cn(
                "mt-2 break-words text-2xl font-medium leading-tight tracking-[-0.05em] tabular-nums",
                revealed ? "text-primary" : "text-muted-foreground",
              )}
              data-stat={label}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
      <p className="border-t px-5 py-3 text-[10px] leading-5 text-muted-foreground">
        {revealed
          ? "Shared perspectives. A more informed estimate."
          : "The full picture appears when the cards are revealed."}
      </p>
    </Card>
  );
}
