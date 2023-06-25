const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

function reduce(fn, acc, iterator) {
  if (!iterator) {
    iterator = acc[Symbol.iterator]();
    acc = iterator.next().value;
  }
  for (const value of iterator) {
    acc = fn(acc, value);
  }
  return acc;
}

function map(fn, iterator) {
  const res = [];
  for (const value of iterator) {
    res.push(fn(value));
  }
  return res;
}

function go(...args) {
  reduce((args, fn) => fn(args), args);
}

go(
  products,
  map((p) => p.quantity),
  console.log
);
