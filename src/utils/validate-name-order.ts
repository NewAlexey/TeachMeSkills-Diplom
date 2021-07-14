const bannedSymbols = [
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '|',
  ':',
  ';',
  '"',
  "'",
  '`',
  '<',
  '>',
  ',',
  '.',
  '?',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

export const checkNameLetters = (value: string): boolean => {
  let result = true;
  for (let i = 0; i < bannedSymbols.length; i += 1) {
    if (value.includes(bannedSymbols[i])) {
      result = false;
      break;
    }
  }

  return result;
};

export const checkNameLength = (value: string): boolean => {
  return value.length > 5 ? true : false;
};
