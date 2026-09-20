import { Layers2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Layers2 className="size-5 -rotate-12" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-[-0.06em]">
        scrum<span className="font-normal text-muted-foreground">poker</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
