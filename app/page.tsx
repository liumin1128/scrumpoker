"use client";

import { ArrowRight, Layers2, MessageCircle, UsersRound } from "lucide-react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { HomeHero } from "@/components/home/home-hero";
import { JoinRoomForm } from "@/components/home/join-room-form";
import { useJoinRoom } from "@/hooks/use-join-room";

const steps = [
  {
    number: "01",
    icon: UsersRound,
    title: "Bring your people",
    description: "One room. Everyone’s perspective.",
  },
  {
    number: "02",
    icon: Layers2,
    title: "Make your call",
    description: "Choose a card, free from influence.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Find your alignment",
    description: "Reveal together. Talk it through.",
  },
];

export default function Home() {
  const {
    defaultRoom,
    iAmScrumMaster,
    setIAmScrumMaster,
    isJoining,
    error,
    joinRoom,
  } = useJoinRoom();

  return (
    <div className="flex min-h-svh flex-col">
      <header className="page-shell flex h-[88px] shrink-0 items-center justify-between border-b border-border/80">
        <Brand />
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 text-[11px] text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-primary/70" /> A little less
            guessing. A lot more alignment.
          </span>
          <ThemeToggle />
        </div>
      </header>
      <main className="page-shell grid flex-1 items-center gap-9 py-10 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:gap-20 lg:py-12">
        <HomeHero />
        <div className="flex justify-center md:justify-end">
          <JoinRoomForm
            defaultRoom={defaultRoom}
            iAmScrumMaster={iAmScrumMaster}
            onScrumMasterChange={setIAmScrumMaster}
            isJoining={isJoining}
            error={error}
            onSubmit={joinRoom}
          />
        </div>
      </main>
      <footer className="page-shell pb-6">
        <div className="grid gap-5 border-t py-6 sm:grid-cols-3 sm:gap-8 sm:py-7">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card/60 text-primary">
                <Icon className="size-4" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs font-semibold">
                  <span className="mr-2 text-[10px] font-normal text-muted-foreground">
                    {number}
                  </span>
                  {title}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5 text-[10px] text-muted-foreground">
          <span>A small ritual for better teamwork.</span>
          <span className="flex items-center gap-1.5">
            Let good ideas add up <ArrowRight className="size-3" />
          </span>
        </div>
      </footer>
    </div>
  );
}
