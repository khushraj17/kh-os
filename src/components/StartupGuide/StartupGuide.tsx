
import { useState } from "react";
import {
  Monitor,
  MousePointerClick,
  AppWindow,
  PanelBottom,
  X,
} from "lucide-react";

import "./StartupGuide.css";

interface StartupGuideProps {
  onEnter: () => void;
  onClose: () => void;
  isSmallScreen: boolean;
}

function StartupGuide({
  onEnter,
  onClose,
  isSmallScreen,
}: StartupGuideProps) {
  const [showWelcome, setShowWelcome] = useState(!isSmallScreen);

  return (
    <div className="startup-overlay">
      {!showWelcome ? (
        <div className="startup-dialog warning-dialog">
          <div className="startup-titlebar">
            <span>KH//OS — Display Recommendation</span>

            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="startup-dialog-body">
            <Monitor size={38} />

            <div>
              <h2>Better experience on a larger screen</h2>
              <p>
                KH//OS is designed for desktop environments.
                Some features may be limited on smaller screens.
              </p>
            </div>
          </div>

          <div className="startup-actions">
            <button onClick={() => setShowWelcome(true)}>
              Continue Anyway
            </button>
          </div>
        </div>
      ) : (
        <div className="startup-dialog welcome-dialog">
          <div className="startup-titlebar">
            <span>KH//OS — First Startup</span>

            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="welcome-content">
            <span className="startup-label">SYSTEM INITIALIZED</span>

            <h1>Welcome to KH//OS</h1>

            <p className="welcome-description">
              Your personal interactive desktop environment.
              Explore my profile, projects, skills, and developer journey.
            </p>

            <div className="guide-items">
              <div className="guide-item">
                <MousePointerClick />
                <div>
                  <h3>Open Applications</h3>
                  <p>Double-click desktop icons to launch applications.</p>
                </div>
              </div>

              <div className="guide-item">
                <AppWindow />
                <div>
                  <h3>Manage Windows</h3>
                  <p>Move, minimize, maximize, and close windows.</p>
                </div>
              </div>

              <div className="guide-item">
                <PanelBottom />
                <div>
                  <h3>Explore the Dock</h3>
                  <p>Use the Dock to launch and switch between apps.</p>
                </div>
              </div>
            </div>

            <button className="enter-button" onClick={onEnter}>
              ENTER KH//OS
            </button>

            <p className="startup-footer">
              You can access this guide again from the Help menu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartupGuide;
