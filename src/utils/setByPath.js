/**
 * Safely update a deep JSON value by path
 * Returns a NEW object (immutability preserved)
 */
export function setByPath(obj, path, value) {
  const keys = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".");

  const newObj = structuredClone(obj);
  let cur = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }

  cur[keys[keys.length - 1]] = value;
  return newObj;
}
