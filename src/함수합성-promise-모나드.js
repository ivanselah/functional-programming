/**
 * 값이 있거나 없을때의 함수 합성을 안전하게 할때 모나드를 사용
 */

// ex)
const add22 = (a) => a + 1;
const fn22 = (a) => a * a;
console.log(fn22(add22(1))); // 4
console.log(fn22(add22())); // NaN
