"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import MyDialog, { type ModalMethods } from "@/components/Dialog";
import { RoomLoading } from "@/components/room/room-loading";
import { RoomView } from "@/components/room/room-view";
import { useRoomCelebration } from "@/hooks/use-room-celebration";
import useSm from "./useSm";
import type { Participant } from "./types";
import "./page.css";

export default function RoomUserPage() {
  const { room, startVoting, endVoting, doVoting, removeParticipant } = useSm();
  const { roomID, username } = useParams<{
    roomID: string;
    username: string;
  }>();
  const dialogRef = useRef<ModalMethods>(null);
  const me = room?.participants.find((person) => person.username === username);

  useRoomCelebration(room);

  useEffect(() => {
    if (room && !me) window.location.href = "/";
  }, [room, me]);

  const confirmRemove = (participant: Participant) => {
    dialogRef.current?.open({
      title: "Remove this teammate?",
      content: `Are you sure you want to remove ${participant.username} from the room?`,
      onConfirm: () => removeParticipant(participant),
    });
  };

  if (!room || !me) return <RoomLoading />;

  return (
    <>
      <RoomView
        room={room}
        roomID={roomID}
        me={me}
        onStartVoting={startVoting}
        onEndVoting={endVoting}
        onVote={(score) => doVoting(score)()}
        onRemove={confirmRemove}
      />
      <MyDialog ref={dialogRef} />
    </>
  );
}
