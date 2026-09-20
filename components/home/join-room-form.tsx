import type { FormEventHandler } from "react";
import {
  ArrowRight,
  Check,
  Hash,
  Loader2,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JoinRoomFormProps {
  defaultRoom?: string;
  iAmScrumMaster: boolean;
  isJoining: boolean;
  error: string;
  onScrumMasterChange: (checked: boolean) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function JoinRoomForm({
  defaultRoom,
  iAmScrumMaster,
  isJoining,
  error,
  onScrumMasterChange,
  onSubmit,
}: JoinRoomFormProps) {
  return (
    <Card className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border-border/80 shadow-[0_16px_60px_-30px_rgba(32,58,42,0.2)]">
      <div className="h-1 w-full bg-primary" />
      <CardHeader className="space-y-3 px-6 pb-7 pt-8 sm:px-9 sm:pt-9">
        <p className="eyebrow text-primary">A seat at the table</p>
        <h2 className="text-[28px] font-semibold tracking-[-0.045em]">
          Let’s get together.
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Enter a room and your name. Your team will take it from there.
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-8 sm:px-9 sm:pb-9">
        <form onSubmit={onSubmit} className="space-y-5" aria-busy={isJoining}>
          <div className="space-y-2">
            <Label htmlFor="room" className="text-xs font-semibold">
              Room name
            </Label>
            <div className="relative">
              <Hash
                className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="room"
                name="room"
                required
                defaultValue={defaultRoom}
                placeholder="e.g. product-team"
                className="h-11 bg-background/50 pl-10 text-base shadow-none sm:text-sm"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                aria-describedby="room-hint"
              />
            </div>
            <p id="room-hint" className="text-[11px] text-muted-foreground">
              Use the same room name as your teammates.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs font-semibold">
              Your name
            </Label>
            <div className="relative">
              <UserRound
                className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="username"
                name="username"
                required
                placeholder="What should we call you?"
                autoComplete="nickname"
                className="h-11 bg-background/50 pl-10 text-base shadow-none sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/60 p-3.5">
            <Checkbox
              id="scrum-master"
              checked={iAmScrumMaster}
              onCheckedChange={(checked) =>
                onScrumMasterChange(checked === true)
              }
              className="mt-0.5 size-4 rounded-[4px]"
              aria-describedby="scrum-master-hint"
            />
            <div className="space-y-1">
              <Label
                htmlFor="scrum-master"
                className="cursor-pointer text-xs font-semibold"
              >
                Join as a scrum master
              </Label>
              <p
                id="scrum-master-hint"
                className="text-[11px] leading-5 text-muted-foreground"
              >
                Guide the conversation without casting a vote.
              </p>
            </div>
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-md bg-destructive/5 p-3 text-xs leading-5 text-destructive"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={isJoining}
            className="h-12 w-full justify-between rounded-lg px-5 shadow-none"
          >
            {isJoining ? "Joining your team…" : "Join room"}
            {isJoining ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <LockKeyhole className="size-3" aria-hidden="true" />
            No sign-up. Just your team.
          </div>
        </form>
      </CardContent>
      <div className="flex items-center justify-center gap-2 border-t bg-secondary/35 px-5 py-3 text-[10px] font-medium text-primary">
        <Check className="size-3" aria-hidden="true" />A little less process. A
        lot more progress.
      </div>
    </Card>
  );
}
