import "./window.css"
import { animateGenie } from "../utils/windowAnimation";

import { useState, useRef, type ReactNode, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";

type WindowProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  onMinimize: () => void;
  maximized: boolean;
  onToggleMaximize: () => void;
  width: number;
  height: number;
  onResize: (width: number, height: number) => void;
  active: boolean;
  initialPosition: {
        x: number;
        y: number;
    };
  dockElement: HTMLButtonElement | null;
  minimized: boolean;
};

function Window({
    title,
    children,
    onClose,
    onToggleMaximize,
    zIndex,
    onFocus,
    onMinimize,
    maximized,
    width,
    height,
    onResize,
    active,
    initialPosition,
    dockElement,
    minimized,
 }: WindowProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(initialPosition);
  const previousPosition = useRef<{ x: number; y: number } | null>(null);
  const windowRef = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const previousMinimized = useRef(minimized);

useEffect(() => {
  if (
    previousMinimized.current &&
    !minimized &&
    dockElement &&
    windowRef.current
  ) {
    const windowRect = windowRef.current.getBoundingClientRect();
    const dockRect = dockElement.getBoundingClientRect();

    setIsAnimating(true);

    const animation = animateGenie(
      windowRef.current,
      {
        x: windowRect.x,
        y: windowRect.y,
        width: windowRect.width,
        height: windowRect.height,
      },
      {
        x: dockRect.x,
        y: dockRect.y,
        width: dockRect.width,
        height: dockRect.height,
      },
      true // reverse animation
    );

    animation.finished
      .catch(() => {})
      .finally(() => {
        animation.cancel();
        setIsAnimating(false);
      });
  }

  previousMinimized.current = minimized;
}, [minimized, dockElement]);

useEffect(() => {
  if (!maximized && previousPosition.current) {
    setPosition(previousPosition.current);
  }
}, [maximized]);


  const handleMinimize = async () => {
  if (!windowRef.current || !dockElement) {
    onMinimize();
    return;
  }

  const windowRect = windowRef.current.getBoundingClientRect();
  const dockRect = dockElement.getBoundingClientRect();

  const animation = animateGenie(
    windowRef.current,
    {
      x: windowRect.x,
      y: windowRect.y,
      width: windowRect.width,
      height: windowRect.height,
    },
    {
      x: dockRect.x,
      y: dockRect.y,
      width: dockRect.width,
      height: dockRect.height,
    }
  );

  setIsAnimating(true);

  try {
    await animation.finished;
  } catch {
    // Animation may be cancelled
  }

  onMinimize();
  setIsAnimating(false);
};

  const handleToggleMaximize = () => {
    if (!maximized && windowRef.current) {
        if (maximized) return;

        const rect = windowRef.current!.getBoundingClientRect();
        previousPosition.current = {
        x: rect.left,
        y: rect.top,
        };

        setPosition({
        x: rect.left,
        y: rect.top,
        });
    }

    onToggleMaximize();
    };

  const dragOffset = useRef({ x: 0, y: 0 });
    
  const resizeStart = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    } | null>(null);

    const resizeDirection = useRef<"right" | "bottom" | "corner" | null>(null);

  const handleResizeStart = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: "right" | "bottom" | "corner"
    ) => {
      if (window.matchMedia("(max-width: 400px)").matches) return;
    if (maximized || isAnimating) return;

    event.preventDefault();
    event.stopPropagation();

    resizeDirection.current = direction;

    resizeStart.current = {
        x: event.clientX,
        y: event.clientY,
        width,
        height,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    };


  const handleResizeMove = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
  if (isAnimating || !resizeStart.current || !resizeDirection.current) return;
  
  const deltaX = event.clientX - resizeStart.current.x;
  const deltaY = event.clientY - resizeStart.current.y;

  const direction = resizeDirection.current;

  let newWidth = resizeStart.current.width;
  let newHeight = resizeStart.current.height;

  if (direction === "right" || direction === "corner") {
    newWidth = Math.max(420, resizeStart.current.width + deltaX);
  }

  if (direction === "bottom" || direction === "corner") {
    newHeight = Math.max(280, resizeStart.current.height + deltaY);
  }

  onResize(newWidth, newHeight);
};


const handleResizeEnd = (
  event: React.PointerEvent<HTMLDivElement>
) => {
  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  resizeStart.current = null;
  resizeDirection.current = null;
};

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(max-width: 400px)").matches) return;
    if (isAnimating) return;
    if ((event.target as HTMLElement).closest(".window-controls")) return;

    const rect = event.currentTarget.parentElement!.getBoundingClientRect();

    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setPosition({ x: rect.left, y: rect.top });

    event.currentTarget.setPointerCapture(event.pointerId);
  };

const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
  if (isAnimating) return;
  if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
  if (maximized) return;

  const windowWidth = windowRef.current?.offsetWidth ?? width;

  const minX = -windowWidth + 120;
  const maxX = window.innerWidth - 120;

  const minY = 0;
  const maxY = window.innerHeight - 32 - 42;

  const newX = event.clientX - dragOffset.current.x;
  const newY = event.clientY - dragOffset.current.y;

  setPosition({
    x: Math.max(minX, Math.min(maxX, newX)),
    y: Math.max(minY, Math.min(maxY, newY)),
  });
};

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
        
        ref={windowRef}
        className={`app-window ${maximized ? "maximized" : ""} ${
            active ? "active-window" : "inactive-window"
          } ${isAnimating ? "animating" : ""} ${
            minimized ? "minimized-window" : ""
          }`}
        style={{
            zIndex,
            width,
            height,
            ...(position
            ? {
                left: position.x,
                top: position.y,
                transform: "none",
                }
            : {}),
        }}
        onPointerDown={onFocus}
    >
      <header
        className="window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="window-controls">
          <button
            className="window-control close"
            onClick={onClose}
            aria-label="Close window"
          >
            <X size={12} />
          </button>

          <button 
            className="window-control minimize" 
            aria-label="Minimize"
            onClick={handleMinimize}
          >
            <Minus size={12} />
          </button>

          <button 
            className="window-control maximize" 
            aria-label="Maximize"
            onClick={handleToggleMaximize}
          >
            <Square size={10} />
          </button>
        </div>

        <span className="window-title">{title}</span>
      </header>

      <div className="window-content">{children}</div>
    {!maximized && (
  <>
    <div
      className="resize-handle resize-right"
      onPointerDown={(event) => handleResizeStart(event, "right")}
      onPointerMove={handleResizeMove}
      onPointerUp={handleResizeEnd}
    />

    <div
      className="resize-handle resize-bottom"
      onPointerDown={(event) => handleResizeStart(event, "bottom")}
      onPointerMove={handleResizeMove}
      onPointerUp={handleResizeEnd}
    />

    <div
      className="resize-handle resize-corner"
      onPointerDown={(event) => handleResizeStart(event, "corner")}
      onPointerMove={handleResizeMove}
      onPointerUp={handleResizeEnd}
    />
  </>
)}
    </section>
  );
}

export default Window;