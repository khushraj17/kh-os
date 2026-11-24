import { useState } from "react";
import Desktop from "./components/Desktop";
import StartupGuide from "./components/StartupGuide/StartupGuide";
import "./App.css";

function App() {

  const [skipRecommendation, setSkipRecommendation] = useState(false);

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
    setSkipRecommendation(true);
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
          skipRecommendation={skipRecommendation}
        />
      )}
    </>
  );
}

export default App;
