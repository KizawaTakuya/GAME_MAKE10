function RuleScreen({ setScreen }) {
  return (
    <div className="screen">
      <h2>MAKE10のルール</h2>

      <div className="rule-text">
        <p>・手札のカードを使って、「10」を作ろう！</p>
        <p>・場の数字の合計が10になると、その時のCOUNTがSCOREに加算されるよ！</p>
        <p>・10よりも大きい数を作ると、その数と10との差がSCOREから引かれるよ！</p>
        <p>・「0」を出すとCOUNTはそのまま場の総和が0になるよ！</p>
        <p>・「+-5」は、出すときに＋かーを選べるよ！</p>
        <p>・5回「10」を作るまでのスコアを高めよう！</p>
      </div>

      <button onClick={() => setScreen("start")}>戻る</button>
    </div>
  );
}

export default RuleScreen;
