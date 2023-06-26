/* -- 기본 range 와 지연 range  -- */
const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const myLange = range(10); // 실행했을때 모든부분이 평가가 된 상태 (Array를 반환)
console.log(myLange);

// 지연 range
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const myLange2 = L.range(10); // 어떠한 코드도 평가되지 않은 상태 (Array를 반환하지 않음) 하나씩 값을 꺼내 사용
console.log(myLange2.next());
