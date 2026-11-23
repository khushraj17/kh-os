import { type RefObject } from "react";
import {
  UserRound,
  FolderKanban,
  Code2,
  FileText,
  Mail,
  Terminal,
} from "lucide-react";

type DockProps = {
  onOpenApp: (id: string) => void;
  dockRefs: RefObject<Record<string, HTMLButtonElement | null>>;

};

const dockItems = [
  { id: "about", label: "About", icon: UserRound },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "terminal", label: "Terminal", icon: Terminal },
];

function Dock({ onOpenApp, dockRefs }: DockProps) {
  return (
    <nav className="dock" onClick={(event) => event.stopPropagation()}>
      {dockItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            ref={(element) => {
              dockRefs.current[item.id] = element;
            }}
            className="dock-item"
            title={item.label}
            onClick={() => onOpenApp(item.id)}
          >
            <Icon size={18} strokeWidth={1.7} />
          </button>
        );
      })}
    </nav>
  );
}

export default Dock;