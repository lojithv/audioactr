export function createData(name: string, date: Date, size: number) {
  return { name, date, size };
}

export const date = Date.now();
export const oneDay = 3600 * 1000 * 24;

export const getNewDate = (date: number) => {
  return new Date(date);
};
