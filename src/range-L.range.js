/* -- 기본 range 와 지연 range  -- */

// 기본 range <- 바로 이터레이터를 만들지 않음
export const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const myLange = range(10); // 실행했을때 모든부분이 평가가 된 상태 (Array를 반환)
console.log(myLange);

// 지연 range <- 바로 이터레이터를 생성함
export const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const myLange2 = L.range(10); // 어떠한 코드도 평가되지 않은 상태 (Array를 반환하지 않음) 하나씩 값을 꺼내 사용
console.log(myLange2.next());

export function timeTest(name, time, fn) {
  console.time(name);
  while (time--) {
    fn();
  }
  console.timeEnd(name);
}

const add = (a, b) => a + b;

timeTest('range', 1000000, () => reduce(add, range(1000000)));
timeTest('L.range', 1000000, () => reduce(add, L.range(1000000))); // <- 조금 더 성능이 좋음
