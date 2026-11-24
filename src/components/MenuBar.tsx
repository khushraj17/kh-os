
import "./Menubar.css";

import { useEffect, useState, type RefObject } from "react";
import { Wifi, BatteryFull, Volume2, ChevronDown } from "lucide-react";
import Dock from "./Dock";

type MenuBarProps = {
  onOpenApp: (id: string) => void;
  dockRefs: RefObject<Record<string, HTMLButtonElement | null>>;
  onOpenWelcomeGuide: () => void;
};

function MenuBar({
  onOpenApp,
  dockRefs,
  onOpenWelcomeGuide,
}: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [helpOpen, setHelpOpen] = useState(false);

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

        <div className="help-menu-container">
          <button
            className={`menu-item ${helpOpen ? "active-app" : ""}`}
            onClick={() => setHelpOpen((prev) => !prev)}
          >
            Help <ChevronDown size={12} />
          </button>

          {helpOpen && (
            <div className="help-dropdown">
              <button
                onClick={() => {
                  onOpenWelcomeGuide();
                  setHelpOpen(false);
                }}
              >
                Welcome Guide
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="menu-center">
        <Dock onOpenApp={onOpenApp} dockRefs={dockRefs} />
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
