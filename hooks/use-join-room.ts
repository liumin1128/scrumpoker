"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const apiPath = process.env.NEXT_PUBLIC_API_URL;

export function useJoinRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [iAmScrumMaster, setIAmScrumMaster] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const joinRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isJoining) return;

    const formData = new FormData(event.currentTarget);
    const roomID = String(formData.get("room") || "");
    const username = String(formData.get("username") || "");
    if (!roomID || !username) return;

    setIsJoining(true);
    setError("");

    try {
      const response = await fetch(apiPath + "/scrumpoker/joinroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomID, username, iAmScrumMaster }),
      });
      const data = await response.json();

      if (data.id) {
        router.push("/room/" + roomID + "/" + username);
      } else {
        setError("We couldn’t join this room. Please try again.");
      }
    } catch {
      setError("Couldn’t reach the room. Check your connection and try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return {
    defaultRoom: searchParams.get("room") || undefined,
    iAmScrumMaster,
    setIAmScrumMaster,
    isJoining,
    error,
    joinRoom,
  };
}
