import { Check, Layers2, MoreHorizontal, UserRound, X } from "lucide-react";
import type { Participant } from "@/app/room/[roomID]/[username]/types";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { getParticipantCardState } from "@/lib/room-presentation";
import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  participant: Participant;
  roomStatus: string;
  isMe: boolean;
  onRemove: (participant: Participant) => void;
}

const stateLabels = {
  idle: "Ready to play",
  thinking: "Thinking…",
  submitted: "Vote submitted",
  revealed: "Revealed",
};

export function ParticipantCard({
  participant,
  roomStatus,
  isMe,
  onRemove,
}: ParticipantCardProps) {
  const state = getParticipantCardState(roomStatus, participant.hasVoted);
  const isOffline = participant.clientIDs?.length === 0;

  return (
    <article
      className="group w-[104px] sm:w-[116px]"
      data-participant={participant.username}
      data-state={state}
    >
      <TiltCard
        className="estimate-card"
        aria-label={`${participant.username}: ${stateLabels[state]}${state === "revealed" ? `, ${participant.voteValue ?? "no vote"}` : ""}`}
      >
        <div
          className={cn(
            "estimate-card-inner",
            state === "submitted" && "is-flipped",
          )}
        >
          <div
            className={cn(
              "card-tilt-face estimate-card-face border bg-card",
              isMe ? "border-primary/40" : "border-border",
            )}
            aria-hidden={state === "submitted"}
          >
            {state === "revealed" ? (
              <>
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-2.5 text-xs font-semibold text-primary"
                >
                  {participant.voteValue ?? "—"}
                </span>
                <span className="text-5xl font-medium tracking-[-0.07em] text-primary">
                  {participant.voteValue ?? "—"}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-3 rotate-180 text-xs font-semibold text-primary"
                >
                  {participant.voteValue ?? "—"}
                </span>
              </>
            ) : (
              <>
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary/70 text-primary/70">
                  {state === "thinking" ? (
                    <MoreHorizontal className="size-6 motion-safe:animate-pulse" />
                  ) : (
                    <UserRound className="size-5" strokeWidth={1.5} />
                  )}
                </span>
                <span className="absolute bottom-4 text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {state === "thinking" ? "Thinking" : "Ready"}
                </span>
              </>
            )}
          </div>
          <div
            className="card-tilt-face card-tilt-face-inverted estimate-card-face estimate-card-back card-pattern border border-primary bg-primary text-primary-foreground"
            aria-hidden={state !== "submitted"}
          >
            <div className="absolute inset-2 rounded-lg border border-primary-foreground/20" />
            <Layers2
              className="size-8 -rotate-12"
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <span className="absolute bottom-5 flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.13em]">
              <Check className="size-2.5" /> Locked in
            </span>
          </div>
        </div>
      </TiltCard>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            isOffline ? "bg-muted-foreground/40" : "bg-primary",
          )}
          role="img"
          aria-label={isOffline ? "Offline" : "Online"}
          title={isOffline ? "Offline" : "Online"}
        />
        <span
          className="min-w-0 truncate text-xs font-semibold"
          title={participant.username}
        >
          {participant.username}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 shrink-0 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive [&_svg]:size-3"
          aria-label={`Remove ${participant.username}`}
          onClick={() => onRemove(participant)}
        >
          <X />
        </Button>
      </div>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        {isMe ? "You · " : ""}
        {isOffline ? "Offline" : stateLabels[state]}
      </p>
    </article>
  );
}
