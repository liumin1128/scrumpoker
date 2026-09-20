import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOTE_OPTIONS } from "@/lib/room-presentation";

export function VoteDeck({ onVote }: { onVote: (score: number) => void }) {
  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div
        className="grid grid-cols-4 gap-3 sm:gap-4 xl:grid-cols-8 xl:gap-2.5"
        role="group"
        aria-label="Choose your estimate"
      >
        {VOTE_OPTIONS.map((score) => (
          <Button
            key={score}
            variant="outline"
            aria-label={`Vote ${score}`}
            onClick={() => onVote(score)}
            className="group relative mx-auto aspect-[2/3] h-auto w-full max-w-[100px] min-w-0 rounded-xl border-primary/25 bg-card p-0 text-primary shadow-[0_2px_3px_rgba(0,0,0,0.02)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-2 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg focus-visible:-translate-y-2 focus-visible:ring-2"
          >
            <span className="absolute left-2.5 top-2 text-[10px] font-medium">
              {score}
            </span>
            <span className="text-3xl font-medium tracking-[-0.06em]">
              {score}
            </span>
            <span className="absolute bottom-2 right-2.5 rotate-180 text-[10px] font-medium">
              {score}
            </span>
            <ArrowUpRight
              className="absolute bottom-2 left-2 size-3 opacity-0 transition-opacity group-hover:opacity-70"
              aria-hidden="true"
            />
          </Button>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Your first instinct is a good place to start.
      </p>
    </div>
  );
}
