"use client";

import type { HTMLAttributes } from "react";
import { useCardTilt } from "@/hooks/use-card-tilt";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { containerRef, surfaceRef } = useCardTilt();

  return (
    <div ref={containerRef} className={cn("card-tilt", className)} {...props}>
      <div ref={surfaceRef} className="card-tilt-surface">
        {children}
      </div>
    </div>
  );
}
