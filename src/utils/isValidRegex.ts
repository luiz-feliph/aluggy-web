export function isValidRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}
