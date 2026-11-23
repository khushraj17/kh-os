import { useEffect, useState, type RefObject } from "react";
import { Wifi, BatteryFull, Volume2 } from "lucide-react";
import Dock from "./Dock";

type MenuBarProps = {
  onOpenApp: (id: string) => void;
  dockRefs: RefObject<Record<string, HTMLButtonElement | null>>;

};


function MenuBar({ onOpenApp, dockRefs }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  return (
    <header className="menu-bar">
      <div className="menu-left">
        <span className="os-logo">KHUSHRAJ</span>
        <span className="menu-item active-app">Desktop</span>
        <span className="menu-item">File</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Window</span>
      </div>

      <div className="menu-center">
        <Dock 
          onOpenApp={onOpenApp}
          dockRefs={dockRefs}
         />
      </div>

      <div className="menu-right">
        <Wifi size={14} />
        <Volume2 size={14} />
        <BatteryFull size={16} />

        <span className="menu-date">{date}</span>
        <span className="menu-time">{time}</span>
      </div>
    </header>
  );
}

export default MenuBar;