/**
 - 제너레이터 : ⭐️이터레이터이자 이터러블을 생성하는 함수
 * * for of, 전개 연산자, 구조 분해, 나머지 연산자 등과함께 사용 가능
 - 제너레이터를 통해 이터레이터를 쉽게 만들 수 있음
 - 제너레이터의 실행결과가 이터레이블 이자 이터레이터 이므로 순회 가능
 - 제너레이터 마지막에 return 100 값을 명시하면 { value : 100, done : true }
 * ! 주의 return 값을 명시해도 순회할때는 출력되지않음 
 * * 즉, 자바스크립트에서는 제너레이터를 통해 순회하는 값을 만들 수 있음
 */

/* ----- */

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

const iter = gen();
console.log(iter[Symbol.iterator]() === iter);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); // { value : 100, done : true }

for (const i of gen()) {
  console.log(i);
}

/* ----- */

function* gen1() {
  yield 1;
  if (false) {
    yield 2; // 조건에 따라 출력에서 제거 할 수 있음
  }
  yield 3;
}

/* -- 이터레이터의 next를 평가할때 까지만 출력되므로 while(true)라고 해도 문제없이 가능 -- */

function* infinity(i = 0) {
  while (true) {
    yield i++;
  }
}
const iter1 = infinity();
console.log(iter1.next());
console.log(iter1.next());

function* limit(limitNum, iterator) {
  for (const value of iterator) {
    yield value;
    if (limitNum === value) {
      return;
    }
  }
}
const iter2 = limit(3, [1, 2, 3, 4, 5]);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next()); // { value : undefined, done : true }

function* odds(limitNum) {
  for (const value of limit(limitNum, infinity(1))) {
    if (value % 2) {
      yield value; // limitNum 까지의 홀수 값 추출
    }
  }
}

for (const value of odds(10)) {
  console.log(value);
}

/* -- 전개 연산자, 구조 분해, 나머지 연산자 -- */
console.log(...odds(10));
console.log([...odds(10), ...odds(20)]);
const [a, b, c, ...rest] = odds(10);
console.log(a, b, c);
console.log(rest);
