export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function getDockRect(
  dockElement: HTMLElement
): Rect {
  const rect = dockElement.getBoundingClientRect();

  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };
}


export function getGenieTransform(
  from: Rect,
  to: Rect
) {
  const scaleX = to.width / from.width;
  const scaleY = to.height / from.height;

  const fromCenterX = from.x + from.width / 2;
  const fromCenterY = from.y + from.height / 2;

  const toCenterX = to.x + to.width / 2;
  const toCenterY = to.y + to.height / 2;

  return {
    scaleX,
    scaleY,
    translateX: toCenterX - fromCenterX,
    translateY: toCenterY - fromCenterY,
  };
}


export function animateGenie(
  element: HTMLElement,
  from: Rect,
  to: Rect,
  reverse = false
) {
  const scaleX = to.width / from.width;
  const scaleY = to.height / from.height;

  const fromCenterX = from.x + from.width / 2;
  const fromCenterY = from.y + from.height / 2;

  const toCenterX = to.x + to.width / 2;
  const toCenterY = to.y + to.height / 2;

  const translateX = toCenterX - fromCenterX;
  const translateY = toCenterY - fromCenterY;

  const dockTransform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

  const middleTransform = `translate(${translateX * 0.55}px, ${translateY * 0.55}px) scale(${Math.sqrt(scaleX)}, ${Math.sqrt(scaleY)})`;

const normalKeyframes = [
  {
    transform: "translate(0, 0) scale(1, 1)",
    opacity: 1,
    borderRadius: "12px",
  },
  {
    transform: middleTransform,
    opacity: 0.85,
    borderRadius: "24px",
  },
  {
    transform: dockTransform,
    opacity: 0.4,
    borderRadius: "50%",
  },
];

const keyframes = reverse
  ? [...normalKeyframes].reverse()
  : normalKeyframes;
  return element.animate(keyframes, {
    duration: 500,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    fill: "forwards",
  });
}