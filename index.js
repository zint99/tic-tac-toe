const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
const Game = () => {
  const [history, setHistory] = React.useState([
    { squares: Array(9).fill(null) }
  ]);
  const [xIsNext, setXIsNext] = React.useState(true);
  const [stepNum, setStepNum] = React.useState(0);
  const current = history[stepNum];
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleClick = (i) => {
    const newhistory = history.slice(0, stepNum + 1);
    const current = newhistory[newhistory.length - 1];
    //需要把新的历史记录拼接到 history 上
    const Newsquares = [...current.squares];
    if (calculateWinner(Newsquares) || Newsquares[i]) {
      return;
    }
    Newsquares[i] = xIsNext ? "x" : "o";
    const newCurrent = { squares: Newsquares };
    setHistory([...history, newCurrent]);
    setXIsNext(!xIsNext);
    setStepNum(history.length);
  };
  const winner = calculateWinner(current.squares);
  const jumpTo = (step) => {
    //跳转到指定Step步骤
    setStepNum(step);
    //如果step是偶数，设置xIsNext
    setXIsNext(step % 2 === 0);
  };
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
