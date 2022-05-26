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

export function stringifyQuery(query) {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return `${acc}${acc ? "&" : ""}${key}=${value}`;
  }, "");
}

export function fetcher(...args) {
  return fetch(...args).then((res) => res.json());
}
