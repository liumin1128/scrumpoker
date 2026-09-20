"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";
import QRCode from "qrcode.react";
import { Check, Copy, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ShareRoom({ roomID }: { roomID: string }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const inviteLink = "https://sm.react.mobi?room=" + roomID;

  return (
    <Popover
      onOpenChange={() => {
        setCopied(false);
        setCopyFailed(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-lg bg-card text-xs shadow-none"
          aria-label="Invite teammates"
        >
          <UserPlus />
          <span className="hidden sm:inline">Invite teammates</span>
          <span className="sm:hidden">Invite</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[min(320px,calc(100vw-2rem))] rounded-xl p-5"
      >
        <h2 className="text-sm font-semibold">Better with your team.</h2>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Scan the code or share a link to this room.
        </p>
        <div className="my-5 flex justify-center rounded-lg border bg-white p-4 text-[#2c624e] dark:text-black">
          <QRCode
            value={inviteLink}
            size={160}
            bgColor="#ffffff"
            fgColor="currentColor"
            renderAs="svg"
            aria-label="Room invitation QR code"
          />
        </div>
        <Input
          value={inviteLink}
          readOnly
          aria-label="Room invitation link"
          className="h-9 bg-background text-xs"
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button
          className="mt-3 w-full shadow-none"
          onClick={() => {
            const success = copy(inviteLink);
            setCopied(success);
            setCopyFailed(!success);
          }}
        >
          {copied ? <Check /> : <Copy />}
          {copied ? "Link copied" : "Copy link"}
        </Button>
        <p className="sr-only" role="status">
          {copied ? "Invitation link copied to clipboard." : ""}
        </p>
        {copyFailed && (
          <p role="alert" className="mt-2 text-xs text-destructive">
            Select the link above to copy it manually.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
