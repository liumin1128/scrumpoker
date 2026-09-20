"use client";

import { useEffect, useRef } from "react";
import { emojiBlasts } from "emoji-blast";
import type { Room } from "@/app/room/[roomID]/[username]/types";

export function useRoomCelebration(room?: Room) {
  const previousRoom = useRef<Room>();
  const cancelCelebration = useRef<() => void>();

  useEffect(() => () => cancelCelebration.current?.(), []);

  useEffect(() => {
    const justRevealed =
      previousRoom.current?.status === "voting" && room?.status === "voted";
    previousRoom.current = room;
    if (!justRevealed || !room) return;

    const votes = room.participants
      .filter((person) => !person.iAmScrumMaster)
      .map((person) => person.voteValue);
    const isConsensus = votes.every((vote) => vote === votes[0]);
    const isChrome = /Chrome|Chromium/.test(navigator.userAgent);
    if (
      !isConsensus ||
      !isChrome ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    cancelCelebration.current?.();
    const { cancel } = emojiBlasts({
      emojiCount: () => Math.random() * 5 + 2,
      interval: 60,
    });
    const timeout = setTimeout(cancel, 1800);

    // Room broadcasts may follow the reveal acknowledgement immediately.
    // Keep the celebration running until its timer or component unmount.
    cancelCelebration.current = () => {
      clearTimeout(timeout);
      cancel();
    };
  }, [room]);
}
