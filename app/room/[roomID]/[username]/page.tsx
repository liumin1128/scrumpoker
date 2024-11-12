"use client";

import { useRef } from "react";
import copy from "copy-to-clipboard";
import { useParams } from "next/navigation";
import { QrCodeIcon, XMarkIcon } from "@heroicons/react/16/solid";
import QRCode from "qrcode.react";
import { Popover, PopoverButton, PopoverPanel, Button } from "@headlessui/react";
import MyDialog, { ModalProps } from "@/components/Dialog";
import "./page.css";
import UseSm from "./useSm";
import { Participant } from "./types";
import { calculateAverageScore, findMostChosenScore, findMaxScore, findMinScore } from "./utils";
import "animate.css";

const RoomUserPage = () => {
  const { room, startVoting, endVoting, doVoting, removeParticipant } = UseSm();
  const { roomID, username } = useParams();
  const dialogRef = useRef<ModalProps>();

  const handleRemoveParticipant = (p: Participant) => () => {
    dialogRef.current?.open({
      title: "Confirm Remove",
      content: "Are you sure you want to remove this member?",
      onConfirm: () => {
        removeParticipant(p);
      },
    });
  };

  if (!room) {
    return <div>loading...</div>;
  }

  const me = room?.participants.find((p) => p.username === username);

  if (!me) {
    window.location.href = "/";
  }

  const participants = room?.participants.filter((i) => !i.iAmScrumMaster && i.clientIDs?.length > 0) || [];

  const voting = room?.status === "voting" && !me?.hasVoted;

  const scores = room?.status === "voted" ? participants.map((p) => p?.voteValue || 0) : [];

  return (
    <div>
      <header className="body-font bg-gray-900 backdrop-blur-sm shadow-lg ">
        <div className="max-h-16 text-white mx-auto flex flex-wrap p-2 flex-row items-center justify-between content-around">
          <div>
            <h1 className="title-font font-medium  text-xl text-slate-200">Room ID: {roomID}</h1>
            <h2 className="title-font font-medium text-xs text-slate-200">Username: {username}</h2>
          </div>

          <div className="flex items-center">
            <Popover>
              <PopoverButton className="mr-4 block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                <QrCodeIcon className="size-6" />
              </PopoverButton>

              <PopoverPanel
                transition
                anchor="bottom"
                className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
              >
                <div className="p-3 bg-slate-950 ">
                  <div className="mb-2 ">
                    <QRCode
                      id={"https://sm.react.mobi?room=" + roomID}
                      value={"https://sm.react.mobi?room=" + roomID}
                      size={180}
                      bgColor="rgba(255,255,255,0)"
                      fgColor="rgba(255,255,255,1)" //二维码的颜色
                    />
                  </div>

                  <Button
                    onClick={() => {
                      copy("https://sm.react.mobi?room=" + roomID);
                    }}
                    className="mt-2 w-full text-center  gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Copy Link
                  </Button>
                </div>
              </PopoverPanel>
            </Popover>

            {room?.status !== "voting" && (
              <button
                className="w-32 text-center text-white inline-flex items-center justify-center  border-0 py-2 px-3 focus:outline-none hover:bg-green-600 rounded text-base bg-green-500 shadow-lg "
                onClick={startVoting}
              >
                Start Voting
              </button>
            )}

            {room?.status === "voting" && (
              <button
                className="w-32 text-center text-white inline-flex items-center justify-center border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded text-base bg-red-500 shadow-lg "
                onClick={endVoting}
              >
                End Voting
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="text-gray-600 mt-8 sm:mt-24 body-font ">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">{calculateAverageScore(scores)}</h2>
              <p className="leading-relaxed">Avg. score</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">{findMostChosenScore(scores).join(", ")}</h2>
              <p className="leading-relaxed">Most chosen</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">{findMaxScore(scores)}</h2>
              <p className="leading-relaxed">Max. score</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-slate-200">{findMinScore(scores)}</h2>
              <p className="leading-relaxed">Min. score</p>
            </div>
          </div>
        </div>
      </section>

      {voting && !me?.iAmScrumMaster && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 sm:py-24 mx-auto">
            <div className="justify-center grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-content-center">
              {[0, 1, , 2, 3, 5, 8, 13, 21].map((i) => {
                return (
                  <button onClick={doVoting(i as number)} key={i} className={`animate__animated animate__fadeInUp animate__faster p-1 sm:p-4 flip-card rounded-lg`}>
                    <div className={`bg-teal-800 shadow-lg shadow-slate-800/50 rounded-lg card-bg card flip-card-inner `}>
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

      {(!voting || me?.iAmScrumMaster) && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 sm:py-24 mx-auto">
            <div className="justify-center grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-content-center">
              {participants.map((participant) => {
                return (
                  <div
                    key={participant.username}
                    className={`animate__animated animate__fadeInUp animate__faster p-1 sm:p-4 flip-card rounded-lg ${room?.status === "voting" && participant.hasVoted ? "flipped" : ""}`}
                  >
                    <div className={`bg-teal-800 shadow-lg shadow-slate-800/50 rounded-lg card-bg card flip-card-inner `}>
                      <div className="flip-card-front rounded-lg">
                        <h1 className="font-bold title-font  title-font sm:text-4xl text-3xl">{room?.status === "voted" && participant.voteValue}</h1>
                        <span className="font-normal title-font  title-font sm:text-xs text-xs">{room?.status === "voting" ? "voting" : ""}</span>
                      </div>
                      <div className="flip-card-back rounded-lg">
                        <h1></h1>
                      </div>
                    </div>
                    <h3
                      className={`pt-2 flex align-middle justify-center text-center tracking-widest text-white text-xs font-medium title-font ${
                        participant?.clientIDs?.length === 0 ? "offline" : "online"
                      }`}
                    >
                      {participant.username}
                      <div className="status-icon"></div>

                      <button onClick={handleRemoveParticipant(participant)}>
                        <XMarkIcon className="size-4" color="red" />
                      </button>
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <MyDialog
        // @ts-ignore
        ref={dialogRef}
      />
    </div>
  );
};

export default RoomUserPage;
