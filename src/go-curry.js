const reduce = (fn, acc, iterator) => {
  if (!iterator) {
    iterator = acc[Symbol.iterator](); // 두번째 초기값이 없이 두번째 인자에 이터레이터 일때 처리
    acc = iterator.next().value;
  }
  for (const value of iterator) {
    acc = fn(acc, value);
  }
  return acc;
};

const filter = (fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    if (fn(value)) {
      res.push(value);
    }
  }
  return res;
};

const map = (fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(fn(value));
  }
  return res;
};

const products = [
  { name: '티셔츠1', price: 15000 },
  { name: '티셔츠2', price: 20000 },
  { name: '티셔츠3', price: 15000 },
  { name: '티셔츠4', price: 30000 },
  { name: '티셔츠5', price: 25000 },
];

/* -- go 함수 -- */
// 이전 함수의 결과값을 다음함수로 전달하는 함수
// .ts 에서 타입추론이 어려움
const go = (...args) => {
  reduce((args, fn) => fn(args), args);
};

const pipe =
  (fn, ...fs) =>
  (...as) =>
    go(fn(...as), ...fs);

go(
  0,
  (a) => a + 10,
  (a) => a + 100,
  console.log
);

const add = (a, b) => a + b;

go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  console.log
); // 30000

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

/* -- curry 함수 --- */

const curry =
  (fn) =>
  (a, ..._) =>
    _.length ? fn(a, ..._) : (..._) => fn(a, ..._);
const mult = curry((a, b) => a * b);
const result = mult(5);

console.log(result(3)); // 15
console.log(result(6)); // 30
console.log(result(10)); // 50

// currey 함수를 적용

{
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

  const filter = curry((fn, iterator) => {
    const res = [];
    for (const value of iterator) {
      if (fn(value)) {
        res.push(value);
      }
    }
    return res;
  });

  const map = curry((fn, iterator) => {
    const res = [];
    for (const value of iterator) {
      res.push(fn(value));
    }
    return res;
  });

  const go = (...args) => {
    reduce((args, fn) => fn(args), args);
  };

  go(
    products,
    filter((p) => p.price < 20000),
    map((p) => p.price),
    reduce(add),
    console.log
  ); // 30000
}
ㅊ;
