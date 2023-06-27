/* -- map 함수 -- */

const products = [
  {
    name: 'test1',
    price: 10000,
  },
  {
    name: 'test2',
    price: 20000,
  },
];

const map = (fn, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(fn(value));
  }
  return res;
};

const result = map((value) => value.price, products);
console.log(result);

// 이터러블 프로토콜을 따른 map 의 다형성
// [].map 이 없을 때, 이터러블 프로토콜만 따르면 위와 같이 만들어서 사용가능

const all = document.querySelectorAll('*');
map((element) => element.nodeName, all);

function* gen() {
  yield 2;
  yield 3;
  yield 4;
}
console.log(map((value) => value * 2, gen())); // 4, 6, 8

const mapValue = new Map(); // 이터러블 프로토콜을 따름
mapValue.set('hello', 10);
mapValue.set('world', 20);

console.log(new Map(map(([key, value]) => [key, value * 2], mapValue))); // {'hello' -> 20, 'world' -> 40}

/* -- 지연 map 함수 -- */
const L = {};
L.map = function* (fn, iterator) {
  for (const value of iterator) {
    yield fn(value);
  }
};
const resultLMap = L.map((value) => value * 2, [1, 2, 3]);
console.log(resultLMap.next());
console.log(...resultLMap);
