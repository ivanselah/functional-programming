/* -- 지금까지 사용한 함수 재정의 -- */
const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
/*
 * curry 함수
 * fn curry로 감싼 함수
 * curry로 감싼 함수는 함수를 리턴하는데 두번째 인자가 없으면 다시 함수를 리턴하여 두번째 인자를 받는다.
 */
// curry(fn) fn => (conditionFn, ..._) === filter function
const curry =
  (fn) =>
  (conditionFn, ...args) => {
    return args.length ? fn(conditionFn, ...args) : (...args) => fn(conditionFn, ...args);
  };
const map = curry((fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(fn(value));
  }
  return res;
});

const filter = curry((fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    if (fn(value)) {
      res.push(value);
    }
  }
  return res;
});
const conditionFn = (a) => a > 2;
console.log(filter(conditionFn));
