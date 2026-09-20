import { Check, Crown, UsersRound } from "lucide-react";
import type { Participant } from "@/app/room/[roomID]/[username]/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/lib/room-presentation";
import { cn } from "@/lib/utils";

interface TeamPanelProps {
  participants: Participant[];
  username: string;
  roomStatus: string;
}

export function TeamPanel({
  participants,
  username,
  roomStatus,
}: TeamPanelProps) {
  const voters = participants.filter((person) => !person.iAmScrumMaster);
  const submitted = voters.filter((person) => person.hasVoted).length;

  return (
    <Card className="rounded-2xl shadow-none">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold">
          <UsersRound className="size-4 text-primary" aria-hidden="true" /> At
          the table
        </h2>
        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {participants.length}
        </span>
      </div>
      {roomStatus === "voting" && (
        <div className="border-b px-5 py-4" aria-live="polite">
          <div className="mb-2 flex justify-between text-[10px]">
            <span className="text-muted-foreground">Votes are coming in</span>
            <span className="font-semibold tabular-nums">
              {submitted} / {voters.length}
            </span>
          </div>
          <Progress
            value={voters.length ? (submitted / voters.length) * 100 : 0}
            className="h-1.5 bg-secondary"
            aria-label={`${submitted} of ${voters.length} votes submitted`}
          />
        </div>
      )}
      <ul className="max-h-[320px] space-y-4 overflow-y-auto p-5">
        {participants.map((person) => {
          const offline = person.clientIDs?.length === 0;
          const status = offline
            ? "Offline"
            : person.iAmScrumMaster
              ? "Scrum master"
              : roomStatus === "voted"
                ? "Revealed"
                : roomStatus === "voting"
                  ? person.hasVoted
                    ? "Voted"
                    : "Thinking…"
                  : "Ready to play";
          return (
            <li
              key={person.id || person.username}
              className="flex items-center gap-2.5"
            >
              <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-primary">
                {getInitials(person.username)}
                <span
                  className={cn(
                    "absolute -bottom-0.5 right-0 size-2.5 rounded-full border-2 border-card",
                    offline ? "bg-stone-400" : "bg-primary",
                  )}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-xs font-medium"
                  title={person.username}
                >
                  {person.username}
                  {person.username === username && (
                    <span className="ml-1 font-normal text-muted-foreground">
                      (you)
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {status}
                </p>
              </div>
              {person.iAmScrumMaster ? (
                <Crown
                  className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-label="Scrum master"
                />
              ) : person.hasVoted && roomStatus === "voting" ? (
                <Check
                  className="size-3.5 shrink-0 text-primary"
                  aria-label="Vote submitted"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
