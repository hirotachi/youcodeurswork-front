export function toggleFromArray<T>(arr: T[], val: T) {
  const result: T[] = [];
  let removed = false;
  arr.forEach((v) => {
    if (v === val) {
      removed = true;
      return;
    }
    result.push(v);
  });
  if (!removed) result.push(val);
  return result;
}
