export function formatValueToNumber(value: string) {
  const formatedValue = value.replace(/R\$|,/gi, '').trim();
  return parseInt(formatedValue);
}

export function formatValueToString(value: number) {
  const stringfiedValue = value.toString();
  const fullValuePart = stringfiedValue.slice(0, -2);
  const centsPart = stringfiedValue.slice(-2);
  return `R$ ${fullValuePart},${centsPart}`;
}
