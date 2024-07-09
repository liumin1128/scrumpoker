"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import io, { Socket } from "socket.io-client";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import "./page.css";

const apiPath = process.env.NEXT_PUBLIC_API_URL as string;

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

const calculateAverageScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  const average = sum / scores.length;
  return average.toFixed(2); // 保留两位小数
};

const findMostChosenScore = (scores: number[]): number[] => {
  if (scores.length === 0) return [0];

  const frequencyMap: Record<number, number> = {};

  // 统计每个元素的频率
  scores.forEach((element) => {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  });

  let maxFrequency = 0;
  let mostFrequentElements: number[] = [];
  Object.entries(frequencyMap).forEach(([element, frequency]) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostFrequentElements = [Number(element)];
    } else if (frequency === maxFrequency) {
      mostFrequentElements.push(Number(element));
    }
  });

  // // 如果只有一个元素出现频率最高，返回这个元素
  // if (mostFrequentElements.length === 1) {
  //   return mostFrequentElements[0];
  // }

  // 如果有多个元素出现频率相同且最高，返回这些元素的数组
  return mostFrequentElements;
};

const findMaxScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  return Math.max(...scores);
};

const findMinScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  return Math.min(...scores);
};

const RoomUserPage = () => {
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

  const handleChoose = (number: number) => () => {
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

  const me = room?.participants.find((p) => p.username === username);

  if (!me) {
    return <div>loading...</div>;
  }

  const participants =
    room?.participants.filter((i) => !i.iAmScrumMaster) || [];

  const voting = room?.status === "voting" && !me.hasVoted;

  const scores =
    room?.status === "voted" ? participants.map((p) => p?.voteValue || 0) : [];

  console.log("scores");
  console.log(scores);

  return (
    <div>
      <header className="body-font bg-gray-900 backdrop-blur-sm shadow-lg ">
        <div className="max-h-16 text-white mx-auto flex flex-wrap p-2 flex-row items-center justify-between content-around">
          <div>
            <h1 className="title-font font-medium  text-xl text-slate-200">
              Room ID: {roomID}
            </h1>
            <h2 className="title-font font-medium text-xs text-slate-200">
              Username: {username}
            </h2>
          </div>

          {room?.status !== "voting" && (
            <button
              className="w-32 text-center text-white inline-flex items-center justify-center  border-0 py-2 px-3 focus:outline-none hover:bg-green-600 rounded text-base bg-green-500 shadow-lg "
              onClick={handleStartVoting}
            >
              Start Voting
            </button>
          )}

          {room?.status === "voting" && (
            <button
              className="w-32 text-center text-white inline-flex items-center justify-center border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded text-base bg-red-500 shadow-lg "
              onClick={handleEndVoting}
            >
              End Voting
            </button>
          )}
        </div>
      </header>

      <section className="text-gray-600 mt-8 sm:mt-24 body-font ">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">
                {calculateAverageScore(scores)}
              </h2>
              <p className="leading-relaxed">Avg. score</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">
                {findMostChosenScore(scores).join(", ")}
              </h2>
              <p className="leading-relaxed">Most chosen</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">
                {findMaxScore(scores)}
              </h2>
              <p className="leading-relaxed">Max. score</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">
                {findMinScore(scores)}
              </h2>
              <p className="leading-relaxed">Min. score</p>
            </div>
          </div>
        </div>
      </section>

      {voting && !me.iAmScrumMaster && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 sm:py-24 mx-auto">
            <div className="justify-center grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-content-center">
              {[0, 1, , 2, 3, 5, 8, 13, 21].map((i) => {
                return (
                  <button
                    onClick={handleChoose(i as number)}
                    key={i}
                    className={`p-1 sm:p-4 flip-card rounded-lg`}
                  >
                    <div
                      className={`bg-teal-800 shadow-lg shadow-slate-800/50 rounded-lg card-bg card flip-card-inner `}
                    >
                      <div className="flip-card-front rounded-lg">
                        <h1 className="font-bold title-font text-lg">{i}</h1>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {(!voting || me.iAmScrumMaster) && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 sm:py-24 mx-auto">
            <div className="justify-center grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-content-center">
              {participants.map((participant) => {
                return (
                  <button
                    key={participant.username}
                    className={`p-1 sm:p-4 flip-card rounded-lg ${
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
                        <h1 className="font-bold title-font  title-font sm:text-4xl text-3xl">
                          {room?.status === "voted" && participant.voteValue}
                        </h1>
                        <span className="font-normal title-font  title-font sm:text-xs text-xs">
                          {room?.status === "voting" ? "voting" : ""}
                        </span>
                      </div>
                      <div className="flip-card-back rounded-lg">
                        {/* 卡牌背面内容 */}
                        <h1></h1>
                      </div>
                    </div>
                    <h3
                      className={`pt-2 text-center tracking-widest text-white text-xs font-medium title-font ${
                        participant?.clientIDs?.length === 0
                          ? "offline"
                          : "online"
                      }`}
                    >
                      {participant.username}
                      <div className="status-icon"></div>
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* <pre>{JSON.stringify(room, null, 2)}</pre> */}
    </div>
  );
};

export default RoomUserPage;
