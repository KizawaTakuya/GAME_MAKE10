import { useState } from "react";
import StartScreen from "./components/StartScreen";
import RuleScreen from "./components/RuleScreen";
import GameScreen from "./components/GameScreen";
import ClearResult from "./components/ClearResult";

function App() {
  const [screen, setScreen] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

  return (
    <>
      {screen === "start" && <StartScreen setScreen={setScreen} />}
      {screen === "rule" && <RuleScreen setScreen={setScreen} />}
      {screen === "game" && (
        <GameScreen
          setScreen={setScreen}
          setFinalScore={setFinalScore}
        />
      )}
      {screen === "clear" && (
        <ClearResult score={finalScore} setScreen={setScreen} />
      )}
    </>
  );
}

export default App;
