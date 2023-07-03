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

const take = curry((length, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(value);
    if (res.length === length) {
      return res;
    }
  }
});

const reduce = curry((fn, acc, iterator) => {
  if (!iterator) {
    iterator = acc[Symbol.iterator]();
    acc = iterator.next().value;
  }
  for (const value of iterator) {
    acc = fn(acc, value);
  }
  return acc;
});

const L = {};

L.range = function* (length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};

L.map = curry(function* (fn, iterator) {
  for (const value of iterator) {
    yield fn(value);
  }
});

L.filter = curry(function* (fn, iterator) {
  for (const value of iterator) {
    if (fn(value)) {
      yield value;
    }
  }
});

const go = (...args) => {
  reduce((args, fn) => fn(args), args);
};

/** 하나씩 순서대로 실행됨
 * [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
 * [11, 13, 15, 17, 19]
 * [11, 13]
 */
go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  console.log
);

/* 지연적으로 */
/** 숫자 하나씩 실행됨 (세로로)
 *  0      1      2      3
 *  10     11     12     13
 *  false  true   false  true
 */
go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  console.log
);

const join = curry((sep = ',', iterator) => reduce((acc, value) => `${acc}${sep}${value}`, iterator));

const query = {
  page: 1,
  size: 10,
  type: 'term',
};

const queryStr = (queryObj) =>
  go(
    queryObj,
    Object.entries,
    map(([key, value]) => `${key}=${value}`),
    reduce((a, b) => `${a}&${b}`),
    console.log
  );
