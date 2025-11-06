export const phones: string[] = [
  "8 (800) 234-78-75",
  "+7 (423) 244-65-55",
  "+7 (423) 245-78-75",
];

export const cleanPhone = (number: string) => number.replace(/[^+\d]/g, "");
