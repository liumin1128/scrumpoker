import {
  ArrowRight,
  Eye,
  Hash,
  Lightbulb,
  Play,
  RotateCcw,
} from "lucide-react";
import type { Participant, Room } from "@/app/room/[roomID]/[username]/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoomHeader } from "@/components/room/room-header";
import { RoundSummary } from "@/components/room/round-summary";
import { TeamPanel } from "@/components/room/team-panel";
import { VotingTable } from "@/components/room/voting-table";
import { cn } from "@/lib/utils";

interface RoomViewProps {
  room: Room;
  roomID: string;
  me: Participant;
  onStartVoting: () => void;
  onEndVoting: () => void;
  onVote: (score: number) => void;
  onRemove: (participant: Participant) => void;
}

export function RoomView({
  room,
  roomID,
  me,
  onStartVoting,
  onEndVoting,
  onVote,
  onRemove,
}: RoomViewProps) {
  const isVoting = room.status === "voting";
  const isRevealed = room.status === "voted";
  const voters = room.participants.filter((person) => !person.iAmScrumMaster);

  return (
    <div className="min-h-svh">
      <RoomHeader roomID={roomID} me={me} />
      <main className="page-shell pb-8 pt-8 sm:pt-10">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="eyebrow text-muted-foreground">Planning session</p>
              <span className="h-3 border-l" />
              <span className="flex min-w-0 items-center gap-1 text-xs text-primary">
                <Hash className="size-3.5 shrink-0" />
                <span className="max-w-[240px] truncate" title={roomID}>
                  {roomID}
                </span>
              </span>
            </div>
            <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.055em] sm:text-[38px]">
              Let’s find our number<span className="text-primary">.</span>
            </h1>
            <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
              Different perspectives. One shared understanding.
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 rounded-full border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground",
                isVoting &&
                  "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300",
                isRevealed && "border-primary/15 bg-secondary text-primary",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full bg-current",
                  isVoting && "motion-safe:animate-pulse",
                )}
              />
              {isVoting
                ? "Voting in progress"
                : isRevealed
                  ? "Cards revealed"
                  : "Ready to begin"}
            </Badge>
            <Button
              onClick={isVoting ? onEndVoting : onStartVoting}
              className="h-10 rounded-lg px-4 text-xs shadow-none"
            >
              {isVoting ? (
                <Eye />
              ) : isRevealed ? (
                <RotateCcw />
              ) : (
                <Play className="fill-current" />
              )}
              {isVoting
                ? "Reveal cards"
                : isRevealed
                  ? "Start new round"
                  : "Start voting"}
            </Button>
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px] xl:gap-6">
          <div className="min-w-0 space-y-5">
            <VotingTable
              participants={voters}
              me={me}
              roomStatus={room.status}
              onVote={onVote}
              onRemove={onRemove}
            />
            <div className="flex items-start gap-3 rounded-xl border border-[#e3e7d9] bg-[#eef1e6]/70 px-5 py-4 dark:border-border dark:bg-secondary/50">
              <Lightbulb
                className="mt-0.5 size-4 shrink-0 text-primary"
                strokeWidth={1.6}
              />
              <div>
                <p className="text-xs font-semibold text-primary">
                  Good estimates start with good conversations.
                </p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  Think about effort, complexity, and uncertainty. If your
                  numbers differ, get curious.
                </p>
              </div>
            </div>
          </div>
          <aside
            className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-1"
            aria-label="Session details"
          >
            <RoundSummary participants={voters} revealed={isRevealed} />
            <TeamPanel
              participants={room.participants}
              username={me.username}
              roomStatus={room.status}
            />
          </aside>
        </div>
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-[10px] text-muted-foreground">
          <span>Less guesswork. More teamwork.</span>
          <span className="flex items-center gap-2">
            Think. Pick. Reveal. <ArrowRight className="size-3 text-primary" />
          </span>
        </footer>
      </main>
    </div>
  );
}
