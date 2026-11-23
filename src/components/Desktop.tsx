import "./Desktop.css"

import {useEffect, useRef, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import MenuBar from "./MenuBar";
import WindowManager from "./WindowManager";
import { apps } from "../config/apps";
import type { AppWindow } from "../types/window";

const desktopItems = [
  { id: "about", label: "About Me", type: "folder" as const },
  { id: "projects", label: "Projects", type: "folder" as const },
  { id: "skills", label: "Skills", type: "folder" as const },
  { id: "resume", label: "Resume", type: "file" as const },
  { id: "contact", label: "Contact", type: "folder" as const },
];

const defaultIconPositions = {
  about: { x: 30, y: 30 },
  projects: { x: 140, y: 30 },
  skills: { x: 250, y: 30 },
  resume: { x: 30, y: 140 },
  contact: { x: 140, y: 140 },
};


function isColliding(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  const width = 90;
  const height = 90;

  return (
    a.x < b.x + width &&
    a.x + width > b.x &&
    a.y < b.y + height &&
    a.y + height > b.y
  );
}



function Desktop() {
  
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [iconPositions, setIconPositions] = useState<
        Record<string, { x: number; y: number }>
        >({
        about: { x: 30, y: 30 },
        projects: { x: 140, y: 30 },
        skills: { x: 250, y: 30 },
        resume: { x: 30, y: 140 },
        contact: { x: 140, y: 140 },
        });

    
    
    const desktopRef = useRef<HTMLElement>(null);
    const dockRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        } | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
            setContextMenu(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        }, []);

    const [windows, setWindows] = useState<AppWindow[]>([]);
        
    const [isRefreshing, setIsRefreshing] = useState(false);
 
    const closeAllWindows = () => {
        setWindows([]);
        setContextMenu(null);
        };


        

  const openApp = (id: string) => {
  const app = apps.find((app) => app.id === id);

  if (!app) return;

  setWindows((current) => {
    const highestZ = current.reduce(
      (max, window) => Math.max(max, window.zIndex),
      100
    );

    const existingWindow = current.find((window) => window.id === id);

    // If already open, bring it to the front
    if (existingWindow) {
      return current.map((window) =>
        window.id === id
          ? { ...window, zIndex: highestZ + 1 , minimized: false}
          : window
      );
    }

    // Otherwise, create a new window
    return [
      ...current,
      {
        id: app.id,
        title: app.title,
        zIndex: highestZ + 1,
        minimized:false,
        maximized: false,
        width: 680,
        height: 440,
        position: {
            x: 400 - current.length * 32,
            y: 30 + current.length * 12,
                },
      },
    ];
  });
};

  return (
    <main

        ref={desktopRef}
      className="desktop"
      onClick={() => {setContextMenu(null);
            setSelectedIcon(null);}}
    
    
      onContextMenu={(event) => {
        event.preventDefault();

        setContextMenu({
            x: event.clientX,
            y: event.clientY,
        });
        }}
    >
      <div className="wallpaper"></div>
      <div className="desktop-overlay"></div>

      <div className={`desktop-icons ${isRefreshing ? "refreshing" : ""}`}
        >
        {desktopItems.map((item, index) => (
        <DesktopIcon
            key={item.id}
            label={item.label}
            type={item.type}
            refreshDelay={index * 40}
            selected={selectedIcon === item.id}
            onClick={() => setSelectedIcon(item.id)}
            onDoubleClick={() => openApp(item.id)}
            position={iconPositions[item.id]}
            desktopBounds={{
                    width: window.innerWidth,
                    height: window.innerHeight - 32,
                    }}
            onPositionChange={(x, y) => {
                setIconPositions((current) => {
                    const newPosition = { x, y };

                    const collision = desktopItems.some((other) => {
                    if (other.id === item.id) return false;

                    return isColliding(newPosition, current[other.id]);
                    });

                    if (collision) return current;

                    return {
                    ...current,
                    [item.id]: newPosition,
                    };
                });
            }}
        />
        ))}
      </div>

      <WindowManager
        windows={windows}
        setWindows={setWindows}
        dockRefs={dockRefs}
        />

      <MenuBar 
      onOpenApp={openApp}
      dockRefs={dockRefs}
      />

      {contextMenu && (
  <div
    className="context-menu"
    
    style={{
        left: Math.min(
            contextMenu.x,
            window.innerWidth - (contextMenuRef.current?.offsetWidth ?? 210) - 8
        ),
        top: Math.min(
            contextMenu.y,
            window.innerHeight - (contextMenuRef.current?.offsetHeight ?? 160) - 8
        ),
        }}
    
    onClick={(event) => event.stopPropagation()}
    ref={contextMenuRef}
  >

    
    <button
      onClick={() => {
        setContextMenu(null);
        setSelectedIcon(null);

        setIsRefreshing(true);

        setTimeout(() => {
        setIsRefreshing(false);
        }, 250);
      }}
    >
      Refresh Desktop
    </button>

    <div className="context-divider" />

    <button onClick={() => {
        setIconPositions(defaultIconPositions);
        setContextMenu(null);
    }}>
      Rearrange Icons
    </button>

    <button onClick={() => {
        closeAllWindows(); 
        setContextMenu(null)
    }}>
      Close all Windows
    </button>

    {/* <button onClick={() => setContextMenu(null)}>
      Display Settings
    </button> */}
  </div>
)}
    </main>
  );
}

export default Desktop;