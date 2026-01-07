import React from "react";

function StartScreen({ setScreen }) {
  // 最高スコアの取得
  const bestScore = Number(localStorage.getItem("bestScore")) || 0;

  return (
    <div className="start-screen">
      <h1>Make 10</h1>

      <div className="best-score">
        最高スコア：{bestScore}
      </div>

      <div className="start-buttons">
        <button onClick={() => setScreen("game")}>
          START
        </button>

        <button onClick={() => setScreen("rule")}>
          ルール
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
