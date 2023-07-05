/* 
  kleisli composition은 함수 합성 방법중 하나입니다. 
  오류가 발생할 수 있는 상황에서, 함수 합성을 안전하게 하는 규칙

  결국 일반적인 코드에서 자주 사용되는 async/await 의 try/catch 혹은 Promise를 직접사용하여 
  체이닝 후 catch를 하는 에러핸들링과 비슷하다고 생각하며 이해하기 쉬울듯
*/

const admins = [
  { pkId: 1, name: 'admin1' },
  { pkId: 2, name: 'admin2' },
  { pkId: 3, name: 'admin3' },
];

const getAdminsById = (pkId) => admins.find((admin) => admin.pkId === pkId);
const getName = ({ name }) => name;

console.log(getName(getAdminsById(3))); // admin3;

const result1 = getName(getAdminsById(3));
admins.pop();
const result2 = getName(getAdminsById(3)); // ! Cannot destructure property 'name' of 'undefined' as it is undefined.

{
  // kleisli composition
  const getAdminsById = (pkId) => admins.find((admin) => admin.pkId === pkId) || Promise.reject('Admin not found');
  const getName = ({ name }) => name;

  const compositionFn = (pkId) => Promise.resolve(pkId).then(getAdminsById).then(getName).catch(console.log); // * Admin not found
  compositionFn(3).then(console.log); // * undefined
}
