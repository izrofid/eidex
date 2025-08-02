export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeSuffix(str: string, suffixes: string[]) {
  for (const suffix of suffixes) {
    const pattern = new RegExp(`${suffix}$`, 'i'); //
    if (pattern.test(str)) {
      return str.replace(pattern, '').trim();
    }
  }
  return str;
}

export const matchesPattern = (str: string, pattern: string): boolean => {
  let i = 0;
  for (let c of str) {
    if (c.toLowerCase() === pattern[i]?.toLowerCase()) {
      i++;
      if (i === pattern.length) return true;
    }
  }
  return false;
};