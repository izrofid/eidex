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
