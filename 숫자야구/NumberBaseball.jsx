import React, { useState }  from 'react';
import Try from './Try';

const getNumbers = () => { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for(let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if(value === answer.join('')) { //정답을 맞춘 경우
      setTries((prevState) => {
        [...prevState, { try: value, result: '홈런!' }]
      });
      setResult('홈런!');
      alert("게임을 다시 시작합니다");
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else { // 정답을 틀린 경우
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if(tries.length >= 9) { // 10번 이상 틀린 경우
        setResult(`10번 넘게 틀려서 실패 답은 ${answer.join(',')}였습니다!`);
        alert("게임을 다시 시작합니다");
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else { // 10번 이내 다시 도전하는 경우
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevState) => (
          [...prevState, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]
        ))
        setValue('');
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
        <button>확인!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
          );
        })}
      </ul>
    </>
  );
}

export default NumberBaseball;