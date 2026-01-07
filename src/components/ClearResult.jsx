function ClearResult({ score, onRestart, setScreen }) {
  return (
    <div
      className="overlay-box"
      style={{
        width: "300px",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>🎉 GAME CLEAR 🎉</h2>

      <div
        style={{
          border: "2px solid gold",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p>最終スコア</p>
        <h1>★ {score} ★</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <button
          style={{ width: "200px" }}
          onClick={onRestart}
        >
          もう一度遊ぶ
        </button>

        <button
          style={{ width: "200px" }}
          onClick={() => setScreen("start")}
        >
          TOPに戻る
        </button>
      </div>
    </div>
  );
}

export default ClearResult;
