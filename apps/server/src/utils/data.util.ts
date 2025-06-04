export function objectIsSet(obj?: unknown): boolean {
  const temp = obj ?? {};
  return Object.keys(temp).length > 0;
}
