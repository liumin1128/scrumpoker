"use client";

import { useEffect, useRef } from "react";
import { createAnimatable } from "animejs/animatable";
import { getCardTilt } from "@/lib/card-tilt";

const FOLLOW_DURATION = 220;

export function useCardTilt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const surface = surfaceRef.current;
    if (!container || !surface) return;

    const canAnimate = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let motion: ReturnType<typeof createAnimatable> | undefined;

    const followPointer = (event: PointerEvent) => {
      if (!canAnimate.matches || event.pointerType === "touch") return;

      motion ??= createAnimatable(surface, {
        "--card-rotate-x": { unit: "deg", duration: FOLLOW_DURATION },
        "--card-rotate-y": { unit: "deg", duration: FOLLOW_DURATION },
        "--card-lift": { unit: "px", duration: FOLLOW_DURATION },
        "--card-pointer-x": { unit: "%", duration: FOLLOW_DURATION },
        "--card-pointer-y": { unit: "%", duration: FOLLOW_DURATION },
        "--card-glow-opacity": 180,
        ease: "out(3)",
      });

      // Measure the stationary container to avoid feedback from the tilted surface.
      const { rotateX, rotateY, lightX, lightY } = getCardTilt(
        event.clientX,
        event.clientY,
        container.getBoundingClientRect(),
      );
      motion["--card-rotate-x"](rotateX, FOLLOW_DURATION);
      motion["--card-rotate-y"](rotateY, FOLLOW_DURATION);
      motion["--card-lift"](-3, FOLLOW_DURATION);
      motion["--card-pointer-x"](lightX);
      motion["--card-pointer-y"](lightY);
      motion["--card-glow-opacity"](1);
    };

    const reset = () => {
      if (!motion) return;
      motion["--card-rotate-x"](0, 450);
      motion["--card-rotate-y"](0, 450);
      motion["--card-lift"](0, 450);
      motion["--card-glow-opacity"](0);
    };

    const clearMotion = () => {
      motion?.revert();
      motion = undefined;
    };

    container.addEventListener("pointerenter", followPointer);
    container.addEventListener("pointermove", followPointer);
    container.addEventListener("pointerleave", reset);
    container.addEventListener("pointercancel", reset);
    canAnimate.addEventListener("change", clearMotion);
    window.addEventListener("blur", reset);

    return () => {
      container.removeEventListener("pointerenter", followPointer);
      container.removeEventListener("pointermove", followPointer);
      container.removeEventListener("pointerleave", reset);
      container.removeEventListener("pointercancel", reset);
      canAnimate.removeEventListener("change", clearMotion);
      window.removeEventListener("blur", reset);
      clearMotion();
    };
  }, []);

  return { containerRef, surfaceRef };
}
