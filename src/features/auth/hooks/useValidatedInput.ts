export function useValidatedInput(value: string, regex: RegExp): boolean {
  return regex.test(value);
}
