/* -- filter 함수 -- */

const products = [
  { name: 'test1', price: 1000 },
  { name: 'test2', price: 2000 },
  { name: 'test3', price: 3000 },
];

const filter = (fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    if (fn(value)) {
      res.push(value);
    }
  }
  return res;
};

console.log(filter((value) => value.price > 2000, products));
console.log(filter((value) => value % 2, [1, 2, 3, 4]));
console.log(
  filter(
    (value) => value % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);

products.filter((value) => value.price > 2000);

/* -- 지연 filter 함수 -- */
const L = {};
L.filter = function* (fn, iterator) {
  for (const value of iterator) {
    if (fn(value)) {
      yield value;
    }
  }
};
const resultLFilter = L.filter((value) => value % 2 === 0, [1, 2, 3, 4]);
console.log(resultLFilter.next());
console.log(...resultLFilter);
