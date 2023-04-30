export function isToxicFunc(toxic: object) {
  const values = Object.values(toxic);

  return values.some((value) => value > 0.8);
}
