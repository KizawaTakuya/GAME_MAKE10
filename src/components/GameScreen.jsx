import { useState } from "react";
import Card from "./Card";
import ClearResult from "./ClearResult";

function GameScreen({ setScreen }) {
  const createRandomCard = () => {
    const values = [0, 1, 2, 3, 4, "+-5", 6, 7, 8, 9, 10];
    const value = values[Math.floor(Math.random() * values.length)];
    return { id: Date.now() + Math.random(), value };
  };

  const [hand, setHand] = useState(
    Array.from({ length: 5 }, () => createRandomCard())
  );
  const [field, setField] = useState([]);
  const [selectingCard, setSelectingCard] = useState(null);

  const [score, setScore] = useState(0);
  const [clearCount, setClearCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  const [clearOverlay, setClearOverlay] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const playCard = (card) => {
    if (card.value === "+-5") {
      setSelectingCard(card);
      return;
    }

    const newHand = hand.filter((c) => c.id !== card.id);
    const newField = [...field, card];

    setHand([...newHand, createRandomCard()]);
    setField(newField);
    checkAfterPlay(newField);
  };

  const decidePlusMinus = (num) => {
    if (!selectingCard) return;

    const newCard = { id: selectingCard.id, value: num };
    const newHand = hand.filter((c) => c.id !== selectingCard.id);
    const newField = [...field, newCard];

    setHand([...newHand, createRandomCard()]);
    setField(newField);
    setSelectingCard(null);
    checkAfterPlay(newField);
  };

  const calcSum = () => {
    let sum = 0;
    let start = 0;
    for (let i = 0; i < field.length; i++) {
      if (field[i].value === 0) start = i + 1;
    }
    for (let i = start; i < field.length; i++) {
      sum += field[i].value;
    }
    return sum;
  };

  const checkAfterPlay = (newField) => {
    let sum = 0;
    let start = 0;

    for (let i = 0; i < newField.length; i++) {
      if (newField[i].value === 0) start = i + 1;
    }
    for (let i = start; i < newField.length; i++) {
      sum += newField[i].value;
    }

    if (sum === 10) {
      const gained = newField.length;
      setScore((prev) => prev + gained);

      setClearCount((prev) => {
        const next = prev + 1;

        if (next === 5) {
          const final = score + gained;
          setFinalScore(final);
          setClearOverlay(true);

          const best = Number(localStorage.getItem("bestScore")) || 0;
          if (final > best) {
            localStorage.setItem("bestScore", final);
          }
        } else {
          setStatusMessage("10ぴったり！");
          setTimeout(() => setStatusMessage(null), 2000);
        }

        return next;
      });

      setField([]);
    } else if (sum > 10) {
      setScore((prev) => prev - (sum - 10));
      setField([]);
      setStatusMessage("10を超えてしまった…");
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  const restartGame = () => {
    setHand(Array.from({ length: 5 }, () => createRandomCard()));
    setField([]);
    setScore(0);
    setClearCount(0);
    setStatusMessage(null);
    setClearOverlay(false);
  };

  return (
    <div style={{ padding: "16px", position: "relative" }}>
      {/* プレイ画面 */}
      <div className="game-area">
        <p className="game-title">「10」を作ろう！</p>
        <p>SCORE: {score}</p>
        <p>成功回数: {clearCount} / 5</p>
        <p>COUNT: {field.length}</p>
        <p>場の合計: {calcSum()}</p>
      </div>

      {/* 場 */}
      <h3 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        場
        {statusMessage && (
          <span
            className={`status-message ${
              statusMessage.includes("ぴったり")
                ? "status-success"
                : "status-fail"
            }`}
          >
            {statusMessage}
          </span>
        )}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          gap: "8px",
          width: "293px",
          minHeight: "180px",
          border: "2px dashed gray",
          padding: "12px",
          justifyContent: "start",
          alignItems: "start",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("text");
          const card = hand.find((c) => c.id.toString() === id);
          if (card) playCard(card);
        }}
      >
        {field.map((card) => (
          <Card key={card.id} value={card.value} />
        ))}
      </div>

      {/* 手札 */}
      <h3>手札( DRAG & DROP )</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        {hand.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("text", card.id.toString())
            }
          />
        ))}
      </div>

      {/* +-5正負選択 */}
      {selectingCard && (
        <div className="overlay-box">
          <p>+-5 をどう使う？</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button onClick={() => decidePlusMinus(5)}>+5</button>
            <button onClick={() => decidePlusMinus(-5)}>-5</button>
          </div>
        </div>
      )}

      {/* リセット と トップ */}
      <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
        <button onClick={restartGame}>RESET</button>
        <button onClick={() => setScreen("start")}>TOPに戻る</button>
      </div>

      {/* ゲームクリア */}
      {clearOverlay && (
        <ClearResult
          score={finalScore}
          onRestart={restartGame}
          setScreen={setScreen}
        />
      )}
    </div>
  );
}

export default GameScreen;
