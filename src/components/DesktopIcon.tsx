import { Folder, FileText } from "lucide-react";
import { useRef } from "react";


type DesktopIconProps = {
  label: string;
  type: "folder" | "file" ;
  selected: boolean;
  onClick: () => void;
  onDoubleClick : ()=> void;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  desktopBounds: {
        width: number;
        height: number;
        };
  refreshDelay: number;
};

function DesktopIcon({
    label, 
    type,
    selected,
    onClick,
    onDoubleClick,
    position,
    onPositionChange,
    desktopBounds,
    refreshDelay,
 }: DesktopIconProps) {

    const isDragging = useRef(false);

    const dragOffset = useRef({
        x: 0,
        y: 0,
    });

    const didDrag = useRef(false);
    const startPosition = useRef({ x: 0, y: 0 });

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        
        if (event.button !== 0) return;

        didDrag.current = false;

        startPosition.current = {
                x: event.clientX,
                y: event.clientY,
                };

        const rect = event.currentTarget.getBoundingClientRect();

        dragOffset.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        isDragging.current = true;

        event.currentTarget.setPointerCapture(event.pointerId);
        };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const distance = Math.sqrt(
            (event.clientX - startPosition.current.x) ** 2 +
            (event.clientY - startPosition.current.y) ** 2
            );

            if (distance > 4) {
            didDrag.current = true;
            }
        const newX = event.clientX - dragOffset.current.x;
        const newY = event.clientY - dragOffset.current.y;
            const iconWidth = 90;
            const iconHeight = 90;

            const boundedX = Math.max(
            0,
            Math.min(newX, desktopBounds.width - iconWidth)
            );

            const boundedY = Math.max(
            0,
            Math.min(newY, desktopBounds.height - iconHeight)
            );

            onPositionChange(boundedX, boundedY);
                    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = false;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        };
  const Icon = type === "folder" ? Folder : FileText ;

  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        animationDelay: `${refreshDelay}ms`,
        }}
      onClick={(event) => {
          event.stopPropagation();

          if (didDrag.current) return;

          onClick();

          if (window.matchMedia("(max-width: 500px)").matches) {
            onDoubleClick();
          }
        }}
      onDoubleClick={(event) => {
            if (didDrag.current) return;
            event.stopPropagation();
            onDoubleClick();
        }}
        onPointerDown={handlePointerDown}
       onPointerMove={handlePointerMove}
       onPointerUp={handlePointerUp}
       onPointerCancel={handlePointerUp}
    >
      <div className="desktop-icon-visual">
        <Icon size={38} strokeWidth={1.5} />
      </div>

      <span className="desktop-icon-label">{label}</span>
    </div>
  );
}


export default DesktopIcon;