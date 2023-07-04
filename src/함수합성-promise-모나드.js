/**
 * 모나드 : 값이 있거나 없을때의 함수 합성을 안전하기 위한 도구(접근방식)
 * 깊이 들어가지 말고 위의 정의정도만 알고 있자
 */

// ex)
const add22 = (a) => a + 1;
const fn22 = (a) => a * a;
console.log(fn22(add22(1))); // 4
console.log(fn22(add22())); // NaN

[1]
  .map(add22)
  .map(fn22)
  .forEach((value) => console.log(value)); // 4
[]
  .map(add22)
  .map(fn22)
  .forEach((value) => console.log(value)); // 실행되지 않음

/**
 * Promise를 통해 함수를 합성하려는것은 위의 []통해 값의 존재 유무에따른 안전한합성 관점이아닌
 * 비동기 대기가 발생했을때의 안전한 합성을 하려는 도구써 Promise를 활용
 * then체이닝(합성)이 resolve를 받을떄까지 진행되지 않는다는점을 활용, 에러가 났을 때 catch로 합성
 * 즉, Promise는 모나드 접근방식를 사용하고 있다.
 */

new Promise((resolve) => {
  setTimeout(() => {
    resolve(7);
  }, 1000);
})
  .then(add22)
  .then(fn22)
  .catch(console.log);
