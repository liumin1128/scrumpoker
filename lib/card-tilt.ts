interface CardBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function getCardTilt(
  clientX: number,
  clientY: number,
  bounds: CardBounds,
) {
  const x =
    bounds.width > 0
      ? Math.min(1, Math.max(0, (clientX - bounds.left) / bounds.width))
      : 0.5;
  const y =
    bounds.height > 0
      ? Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height))
      : 0.5;

  return {
    rotateX: (0.5 - y) * 12,
    rotateY: (x - 0.5) * 12,
    lightX: x * 100,
    lightY: y * 100,
  };
}
