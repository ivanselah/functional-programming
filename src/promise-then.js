/* Promise가 중첩되어도 하나의 then 으로 처리되어 진다.
 * 깊이 Promise를 중첩하더라도 제일 안쪽의 resolve의 값이 마지막 then으로 떨어진다.
 */
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log);

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(console.log);
