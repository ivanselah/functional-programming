/* -- reduce 함수 -- */
/* 하나의 값을 다른 값으로 축약하는 함수 */

export const reduce = (fn, acc, iterator) => {
  if (!iterator) {
    iterator = acc[Symbol.iterator](); // 두번째 초기값이 없이 두번째 인자에 이터레이터 일때 처리
    acc = iterator.next().value;
  }
  for (const value of iterator) {
    acc = fn(acc, value);
  }
  return acc;
};

const add = (a, b) => a + b;
console.log(reduce(add, [1, 2, 3, 4, 5])); // 15
