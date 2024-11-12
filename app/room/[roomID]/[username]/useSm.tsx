"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useParams, useRouter } from "next/navigation";
import { Participant, Room } from "./types";

const apiPath = process.env.NEXT_PUBLIC_API_URL as string;

const useSm = () => {
  const router = useRouter();
  const { roomID, username } = useParams();
  const socketRef = useRef<Socket>();
  const [room, setRoom] = useState<Room>();

  const initSocket = useCallback(() => {
    const socket = io(apiPath, {
      query: {
        roomID: roomID,
      },
    });

    socketRef.current = socket;

    socket.on("connect", function () {
      socket.on("update", (data: Room) => {
        console.log("update", data);
        setRoom(data);
      });

      socket.on("message", function (data: any) {
        console.log("message:", data);
      });

      socketRef.current?.emit(
        "connectRoom",
        {
          roomID: roomID,
          username: username,
        },
        (res: Response) => {
          console.log("connectRoom:", res);
          if (res.code === 200) {
            setRoom(res.data);
          }
          if (res.code === 401) {
            router.push("/");
          }
        }
      );
    });

    socket.on("events", function (data: any) {
      console.log("event", data);
    });

    socket.on("exception", function (data: any) {
      console.log("event", data);
    });

    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
  }, [roomID, username, router]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const startVoting = () => {
    socketRef.current?.emit(
      "startVoting",
      {
        roomID: roomID,
      },
      setRoom
    );
  };

  const endVoting = () => {
    socketRef.current?.emit(
      "endVoting",
      {
        roomID: roomID,
      },
      setRoom
    );
  };

  const doVoting = (number: number) => () => {
    socketRef.current?.emit(
      "voting",
      {
        roomID: roomID,
        username: username,
        voteValue: number,
      },
      setRoom
    );
  };

  const removeParticipant = (p: Participant) => {
    socketRef.current?.emit(
      "removeParticipant",
      {
        roomID: roomID,
        uID: p.id,
      },
      setRoom
    );
  };

  return {
    room,
    startVoting,
    endVoting,
    doVoting,
    removeParticipant,
  };
};

export default useSm;
