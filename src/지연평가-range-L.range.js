/* -- 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)  -- */
// - 제때 계산법
// - 느긋한 계산법
// - 제너레이터/이터레이터 프로토콜을 기반으로 구현
// - next를 통해 내가 평가하는 만큼만 값을 가져옴

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

/* 
reduce 코드의 첫 번째 인자로 전달되는 callback 함수에서 
배열 대신 이터레이터를 직접 사용할 수 있으므로, 
이터레이터를 생성하는 과정은 생략됩니다.
*/

const add = (a, b) => a + b;

timeTest('range', 1000000, () => reduce(add, range(1000000)));
timeTest('L.range', 1000000, () => reduce(add, L.range(1000000))); // <- 조금 더 성능이 좋음

/* -- take 잘라주는 함수 -- */

const take = (l, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(value);
    if (res.length === l) {
      return res;
    }
  }
  return res;
};

console.log(take(5, range(10))); // [0, 1, 2, 3, 4]
console.log(take(5, L.range(10))); // [0, 1, 2, 3, 4]

console.log(take(5, range(1000000))); // <- range 범위만큼 만들고 5개를 뽑는거
console.log(take(5, L.range(1000000))); // <- range 범위에서 5개의 값만 만듬
console.log(take(5, L.range(Infinity))); // <- 5개의 값만 만들기 때문에 무한 값도 가능
