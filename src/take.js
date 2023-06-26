/* -- 잘라주는 함수 -- */

export const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const take = (l, iterator) => {
  const res = [];
  for (const value of iterator) {
    res.push(value);
    if (res.length === l) {
      return res;
    }
    return res;
  }
};

console.log(take(5, range(10)));
