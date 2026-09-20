import { Loader2 } from "lucide-react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

export function RoomLoading() {
  return (
    <div className="min-h-svh">
      <header className="border-b bg-card/80">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <Brand />
          <ThemeToggle />
        </div>
      </header>
      <main
        className="flex min-h-[65svh] flex-col items-center justify-center px-5 text-center"
        role="status"
      >
        <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary">
          <Loader2
            className="size-6 animate-spin text-primary"
            strokeWidth={1.5}
          />
        </span>
        <h1 className="text-xl font-semibold tracking-tight">
          Setting the table…
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Connecting you to your team.
        </p>
      </main>
    </div>
  );
}
