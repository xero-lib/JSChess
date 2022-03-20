export default function coordCompare(arr1, arr2) {
  if (!arr1 || !arr2) { return -1; }
  let [x1, y1] = arr1;
  let [x2, y2] = arr2;
  return x1 === x2 && y1 === y2;
}
