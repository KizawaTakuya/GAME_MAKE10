import { useState } from "react";

function Card({ value, draggable, onDragStart }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        setIsDragging(true);
        if (onDragStart) onDragStart(e);
      }}
      onDragEnd={() => setIsDragging(false)}
      style={{
        width: "50px",
        height: "80px",
        border: "1px solid black",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        userSelect: "none",
        cursor: draggable ? "grab" : "default",
        transform: isDragging ? "scale(1.3)" : "scale(1)",
        transition: "transform 0.1s",
        zIndex: isDragging ? 100 : "auto",
        background: "white",
      }}
    >
      <span style={{ color: "black", fontWeight: "bold" }}>{value}</span>
    </div>
  );
}

export default Card;
