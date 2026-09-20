export const VOTE_OPTIONS = [0, 1, 2, 3, 5, 8, 13, 21] as const;

export type ParticipantCardState =
  "idle" | "thinking" | "submitted" | "revealed";

export function getParticipantCardState(
  roomStatus: string,
  hasVoted?: boolean,
): ParticipantCardState {
  if (roomStatus === "voted") return "revealed";
  if (roomStatus === "voting") return hasVoted ? "submitted" : "thinking";
  return "idle";
}

export function getInitials(name: string) {
  return Array.from(name.trim()).slice(0, 2).join("").toUpperCase();
}
