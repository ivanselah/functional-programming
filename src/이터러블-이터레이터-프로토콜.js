/**
 - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
 - 이터레이터 : { value, done } 객체를 리턴하는 next() 를 가진 값
 - 이터러블/이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
 */

const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();
iterator.next(); // { value : 1, done : false }

const i = array[Symbol.iterator]();
console.log(i.next());
console.log(i.next());
console.log(i.next());

for (const a of array) {
  console.log(a);
}

const makeIterator = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};
let iterator1 = makeIterator[Symbol.iterator]();
for (const i of iterator1) {
  console.log(i);
}
const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
iter2.next();
for (const a of iter2) {
  console.log(a);
}

// 전개 연산자 - 이터러블 프로토콜 사용
const arr3 = [1, 2];
console.log([...arr3, ...[3, 4]]); // [1, 2, 3, 4]
