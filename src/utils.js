export function isValidUrl(str) {
  if (!/^(f|ht)tps?:\/\//i.test(str)) {
    return false;
  }
  return true;
}
