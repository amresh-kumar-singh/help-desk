export default function (arr, key) {
  const _tempUniqueObject = arr.reduce((acc, item) => {
    const prop = item[key];
    return { ...acc, [prop]: item };
  }, {});
  return Object.values(_tempUniqueObject);
}
