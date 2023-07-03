/* callback */
function add1(value, callback) {
  setTimeout(() => callback(value + 10), 1000);
}

add1(5, (res) => {
  add1(res, (res) => {
    add1(res, (res) => {
      add1(res, (res) => {
        console.log(res);
      });
    });
  });
});

/* Promise
 ** callback과 차이
 ** then 사용 및 콜백지옥 해결보다
 ** 가장 큰 차이점은 비동기상황을 일급 값으로 다룬다
 */
function add2(value) {
  // 값을 만들어서 리턴하고 있다, 비동기상황을 일급 값으로
  return new Promise((resolve) => {
    setTimeout(() => resolve(value + 20), 1000);
  });
}

/* ⭐️ 결과의 상황을 일급 값으로 만들어서 지속적으로 
      어떤 일들을 연결해 나갈수 있도록 하는게 Pomise의 가장 큰 특징 
*/

add2(5)
  .then(add2) // 리턴값을 가지고 무엇가를 또 할 수 있다
  .then(add2)
  .then(add2)
  .then(console.log);

/**
 * 활용
 */
const getValueAfterDelay = (value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), 1000);
  });

const add123 = (value) => value + 50;

const go123 = (value, fn) => fn(value);

go123(getValueAfterDelay(50), add123); // [object Promise]50

const newGo123 = (value, fn) => (value instanceof Promise ? value.then(fn) : fn(value));

const res1 = newGo123(50, add123);
const res2 = newGo123(getValueAfterDelay(50), add123);
console.log(res1); // 100
res2.then(console.log); // 100

/* 동일하게 작성 */
const v1 = 50;
const v2 = getValueAfterDelay(50);
newGo123(newGo123(v1, add123), console.log);
newGo123(newGo123(v2, add123), console.log);
