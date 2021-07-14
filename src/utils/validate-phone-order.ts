const regMobile = /((25|29|33|34) ([0-9]{3}( [0-9]{2}){2}))/;
const regNumbersAndSpace = /^[0-9 ]+$/;

export const checkPhone = (value: string): boolean => {
  return regMobile.test(value);
};

export const checkPhoneSymbols = (value: string): boolean => {
  return regNumbersAndSpace.test(value);
};
