"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import io, { Socket } from "socket.io-client";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import "./page.css";

export interface Participant {
  id: string;
  username: string;
  status?: string;
  iAmScrumMaster?: boolean;
  voteValue?: number;
  canVote?: boolean;
  hasVoted?: boolean;
  clientIDs: string[];
}

export interface Room {
  id: string;
  status: string;
  participants: Participant[];
}

export interface UpdateMessageBody {
  id: string;
  user: string;
}

export interface CreateRoomBody {
  username: string;
  roomID: string;
  clientID: string;
}

export interface JoinRoomBody {
  roomID: string;
  username: string;
  clientID: string;
  iAmScrumMaster?: boolean;
}

export interface ConnectRoomBody {
  roomID: string;
  username: string;
  clientID: string;
}

export interface DisconnectBody {
  roomID: string;
  clientID: string;
}

export interface RemoveParticipantBody {
  roomID: string;
  username: string;
}

export interface VotingBody {
  roomID: string;
  username: string;
  voteValue: number;
}

export interface StartVotingBody {
  roomID: string;
}

export interface EndVotingBody {
  roomID: string;
}

export interface Response {
  code: number;
  data?: Room;
  message?: string;
}

const RoomUserPage = () => {
  const router = useRouter();
  const { roomID, username } = useParams();

  const socketRef = useRef<Socket>(null);

  const [room, setRoom] = useState<Room>();

  const initSocket = useCallback(() => {
    const socket = io("http://localhost:3111", {
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

  const handleStartVoting = () => {
    socketRef.current?.emit(
      "startVoting",
      {
        roomID: roomID,
      },
      setRoom
    );
  };

  const handleEndVoting = () => {
    socketRef.current?.emit(
      "endVoting",
      {
        roomID: roomID,
      },
      setRoom
    );
  };

  const handleVoting = () => {
    socketRef.current?.emit(
      "voting",
      {
        roomID: roomID,
        username: username,
        voteValue: 5,
      },
      setRoom
    );
  };

  return (
    <div>
      <header className="body-font bg-gray-900 backdrop-blur-sm">
        <div className="text-white mx-auto flex flex-wrap p-2  flex-row items-center">
          <a className="flex title-font font-medium items-center mb-4 md:mb-0">
            Room ID: {roomID}
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>

          {room?.status !== "voting" && (
            <button
              className="text-gray-900 inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 bg-cyan-500 shadow-lg shadow-cyan-500/50 ..."
              onClick={handleStartVoting}
            >
              start voting
            </button>
          )}
          {room?.status === "voting" && (
            <button
              className="text-gray-900 inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 bg-cyan-500 shadow-lg shadow-cyan-500/50 ..."
              onClick={handleEndVoting}
            >
              end voting
            </button>
          )}
          <button
            className="text-gray-900 inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 bg-cyan-500 shadow-lg shadow-cyan-500/50 ..."
            onClick={handleVoting}
          >
            voting
          </button>
        </div>
      </header>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {room?.participants.map((participant) => {
              return (
                <div
                  key={participant.username}
                  className={`p-4 flip-card rounded-lg ${
                    room?.status === "voting" && participant.hasVoted
                      ? "flipped"
                      : ""
                  }`}
                >
                  <div
                    className={`bg-teal-800 shadow-lg shadow-slate-800/50 rounded-lg card-bg card flip-card-inner `}
                  >
                    <div className="flip-card-front rounded-lg">
                      {/* 卡牌正面内容 */}
                      <h1 className="font-bold title-font text-lg">
                        {room?.status === "voted" && participant.voteValue}
                        {room?.status === "voting" ? "voting" : ""}
                      </h1>
                    </div>
                    <div className="flip-card-back rounded-lg">
                      {/* 卡牌背面内容 */}
                      <h1></h1>
                    </div>
                  </div>
                  <h3 className="pt-2 text-center tracking-widest text-white text-xs font-medium title-font">
                    {participant.username}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <pre>{JSON.stringify(room, null, 2)}</pre> */}
    </div>
  );
};

export default RoomUserPage;
