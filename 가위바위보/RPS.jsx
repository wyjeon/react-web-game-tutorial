import React, { useState, useRef, useEffect } from "react";

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  rock: "0",
  scissors: "-142px",
  paper: "-284px",
};

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RPS = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const interval = useRef();

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할
    interval.current = setInterval(changeHand, 100);
    return () => {
      //componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("paper")}>
          보
        </button>
        <button id="scissors" className="btn" onClick={onClickBtn("scissors")}>
          가위
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RPS;
