import type { Dispatch, SetStateAction } from "react";
import Window from "./Window";
import type { AppWindow } from "../types/window";
import { apps } from "../config/apps";

type WindowManagerProps = {
  windows: AppWindow[];
  setWindows: Dispatch<SetStateAction<AppWindow[]>>;
};


function WindowManager({ windows, setWindows }: WindowManagerProps) {


  const focusWindow = (id: string) => {
  setWindows((current) => {
    const highestZ = current.reduce(
      (max, window) => Math.max(max, window.zIndex),
      100
    );

    return current.map((window) =>
      window.id === id
        ? { ...window, zIndex: highestZ + 1 }
        : window
    );
  });
};

const closeWindow = (id: string) => {
  setWindows((current) => current.filter((window) => window.id !== id));
};

const minimizeWindow = (id: string) => {
  setWindows((current) =>
    current.map((window) =>
      window.id === id
        ? { ...window, minimized: true }
        : window
    )
  );
};

const toggleMaximize = (id: string) => {
  setWindows((current) =>
    current.map((window) =>
      window.id === id
        ? { ...window, maximized: !window.maximized }
        : window
    )
  );
};

  return (
  <>
    {windows.map((window) => {
      if (window.minimized) return null;
      const app = apps.find((app) => app.id === window.id);

      if (!app) return null;

      return (
        <Window
          key={window.id}
          title={app.title}
          zIndex={window.zIndex}
          initialPosition={window.position}
          onFocus={() => focusWindow(window.id)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          maximized={window.maximized}
          onToggleMaximize={() => toggleMaximize(window.id)}
          width={window.width}
          height={window.height}
          onResize={(width, height) => {
            setWindows((current) =>
                current.map((item) =>
                item.id === window.id
                    ? { ...item, width, height }
                    : item
                )
            );
            }}
          active={
                !window.minimized &&
                window.zIndex ===
                    Math.max(
                    ...windows
                        .filter((w) => !w.minimized)
                        .map((w) => w.zIndex)
                    )
                }
       >
          {app.content}
        </Window>
      );
    })}
  </>
);
}

export default WindowManager;