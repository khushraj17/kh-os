
import { useState } from "react";
import Desktop from "./components/Desktop";
import StartupGuide from "./components/StartupGuide/StartupGuide";
import "./App.css";

function App() {
  const [hasEntered, setHasEntered] = useState(
    () => localStorage.getItem("khos-onboarding-complete") === "true"
  );

  const [isSmallScreen] = useState(
    () => window.matchMedia("(max-width: 768px)").matches
  );

  const handleEnter = () => {
    localStorage.setItem("khos-onboarding-complete", "true");
    setHasEntered(true);
  };
  const openWelcomeGuide = () => {
    setHasEntered(false);
  };

  return (
    <>
      <Desktop onOpenWelcomeGuide={openWelcomeGuide}/>

      {!hasEntered && (
        <StartupGuide
          onEnter={handleEnter}
          isSmallScreen={isSmallScreen}
        />
      )}
    </>
  );
}

export default App;
