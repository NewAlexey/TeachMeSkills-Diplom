export const getDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = checkLength(date.getMonth() + 1);
  const day = checkLength(date.getDate());
  const hours = checkLength(date.getHours());
  const min = checkLength(date.getMinutes());
  return `${hours}:${min}, ${day}.${month}.${year}`;
};

const checkLength = (date: number): string => {
  let value = `${date}`;
  if (value.length === 1) {
    value = `0${value}`;
  }

  return value;
};
