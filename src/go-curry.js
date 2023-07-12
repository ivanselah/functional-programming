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
// 즉시 값을 평가 할 때 사용
const go = (...args) => {
  //ex. args [0, fn1, fn1, fn1, fn1]
  return reduce((a, fn1) => fn1(a), args);
};

// 합성된 함수를 만드는 함수를 리턴
// ex. fn 첫번째 함수만 꺼냄
const pipe =
  (fn, ...fs) =>
  (...as) =>
    go(fn(...as), ...fs);
const testPipe = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);
testPipe(0, 1);

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
/* 좀더 편리하게 사용하기 위해 curry 로 감싼다 
   처음 인자를 받지 않으면 함수를 리턴해서 인자를 받는다.
*/

// fn // curry로 감싼 함수
const curry =
  (fn) =>
  (conditionFn, ...args) => {
    return args.length ? fn(conditionFn, ...args) : (...args) => fn(conditionFn, ...args);
  };
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

  /* 
커리함수로 감싼 함수에 인자 하나를 전달하여 즉시실행 하지 않고 함수를 반환하도록 함
반한된 함수는 콜백함수로 go함수에 전달 됨
따라서 반환된 함수의 실행 시점과 인자는 go함수에게 위임됨
go함수 의 정의된 내용에 따라 실행되며 반환된 함수에 products값을 인자로 넘겨 실행
결국 go함수의 입장에서 보면
(products) => curry(filter)((p) => p.price < 20000)(products) === curry(filter)((p) => p.price < 20000)
*/
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
