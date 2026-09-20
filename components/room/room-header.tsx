import { ChevronRight } from "lucide-react";
import type { Participant } from "@/app/room/[roomID]/[username]/types";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShareRoom } from "@/components/room/share-room";
import { getInitials } from "@/lib/room-presentation";

export function RoomHeader({
  roomID,
  me,
}: {
  roomID: string;
  me: Participant;
}) {
  return (
    <header className="border-b bg-card/80">
      <div className="page-shell flex h-[76px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Brand />
          <div className="hidden min-w-0 items-center gap-3 border-l pl-6 text-xs text-muted-foreground md:flex">
            <span>Workspace</span>
            <ChevronRight className="size-3 shrink-0" />
            <span
              className="max-w-44 truncate font-medium text-foreground"
              title={roomID}
            >
              {roomID}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          <ThemeToggle />
          <ShareRoom roomID={roomID} />
          <div className="hidden items-center gap-2.5 border-l pl-5 sm:flex">
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-primary">
              {getInitials(me.username)}
            </span>
            <div className="hidden lg:block">
              <p
                className="max-w-32 truncate text-xs font-semibold"
                title={me.username}
              >
                {me.username}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {me.iAmScrumMaster ? "Scrum master" : "Team member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
