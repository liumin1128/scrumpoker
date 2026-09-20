import {
  Check,
  Layers2,
  LockKeyhole,
  MessageCircle,
  UsersRound,
} from "lucide-react";
import type { Participant } from "@/app/room/[roomID]/[username]/types";
import { Card } from "@/components/ui/card";
import { ParticipantCard } from "@/components/room/participant-card";
import { VoteDeck } from "@/components/room/vote-deck";

interface VotingTableProps {
  participants: Participant[];
  me: Participant;
  roomStatus: string;
  onVote: (score: number) => void;
  onRemove: (participant: Participant) => void;
}

export function VotingTable({
  participants,
  me,
  roomStatus,
  onVote,
  onRemove,
}: VotingTableProps) {
  const isVoting = roomStatus === "voting";
  const isRevealed = roomStatus === "voted";
  const canVote = isVoting && !me.hasVoted && !me.iAmScrumMaster;
  const allVoted =
    participants.length > 0 && participants.every((person) => person.hasVoted);
  const title = canVote
    ? "What’s your take?"
    : isRevealed
      ? "A little closer to clarity."
      : isVoting
        ? allVoted
          ? "Everyone’s ready."
          : "Great minds, at work."
        : "Every great plan starts here.";
  const description = canVote
    ? "Choose a card that feels right for the effort."
    : isRevealed
      ? "The cards are on the table. Let’s talk it through."
      : isVoting
        ? allVoted
          ? "Reveal the cards to see where your team lands."
          : "Give everyone a moment to find their number."
        : "Gather your team, then start a round when you’re ready.";

  return (
    <Card className="overflow-hidden rounded-2xl shadow-none">
      <div className="flex items-center justify-between gap-3 border-b px-5 py-4 sm:px-7">
        <span className="eyebrow text-muted-foreground">The table</span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Layers2 className="size-3.5" aria-hidden="true" /> Fibonacci deck
        </span>
      </div>
      <div className="relative min-h-[410px] bg-[#fcfcfa] px-4 py-9 sm:px-8 sm:py-10 dark:bg-background/50">
        <div
          className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(transparent,black_35%,black_65%,transparent)]"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mb-9 text-center" aria-live="polite">
            {isVoting && me.hasVoted && !me.iAmScrumMaster && (
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-primary">
                <Check className="size-3" /> Your estimate is in
              </p>
            )}
            <h2 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
              {title}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          {canVote ? (
            <VoteDeck onVote={onVote} />
          ) : participants.length > 0 ? (
            <div
              className="flex flex-wrap justify-center gap-x-5 gap-y-7 sm:gap-x-6"
              aria-label="Participant cards"
            >
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id || participant.username}
                  participant={participant}
                  roomStatus={roomStatus}
                  isMe={participant.username === me.username}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-xs flex-col items-center rounded-xl border border-dashed bg-card/70 px-5 py-8 text-center">
              <UsersRound
                className="mb-3 size-7 text-primary/50"
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium">Room for more perspectives.</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Share the room link to bring your teammates to the table.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 border-t bg-card px-5 py-4 text-center text-[11px] leading-5 text-muted-foreground">
        {isRevealed ? (
          <MessageCircle className="size-3.5 shrink-0" />
        ) : (
          <LockKeyhole className="size-3.5 shrink-0" />
        )}
        {isRevealed
          ? "Different numbers? That’s where good conversations begin."
          : "A little mystery helps. Votes stay hidden until the reveal."}
      </div>
    </Card>
  );
}
