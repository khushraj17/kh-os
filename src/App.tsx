import { useState } from "react";
import Desktop from "./components/Desktop";
import StartupGuide from "./components/StartupGuide/StartupGuide";
import "./App.css";

function App() {

  const [isGuideOpen, setIsGuideOpen] = useState(
    () => localStorage.getItem("khos-onboarding-complete") !== "true"
  );

  const [isSmallScreen] = useState(
    () => window.matchMedia("(max-width: 768px)").matches
  );

  const handleEnter = () => {
    localStorage.setItem("khos-onboarding-complete", "true");
    setIsGuideOpen(false);
  };

  const openWelcomeGuide = () => {
    setIsGuideOpen(true);
  };

  const closeWelcomeGuide = () => {
    setIsGuideOpen(false);
  };

  return (
    <>
      <Desktop onOpenWelcomeGuide={openWelcomeGuide} />

      {isGuideOpen && (
        <StartupGuide
          onEnter={handleEnter}
          onClose={closeWelcomeGuide}
          isSmallScreen={isSmallScreen}
        />
      )}
    </>
  );
}

export default App;
