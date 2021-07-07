import { IUserInfo } from './interfaces';

export const getOrderDataForTg = (user: IUserInfo): string => {
  const order = getOrderString(user);
  return `Name: <b>${user.name}</b>\n\nEmail: <b>${user.email}</b>\n\nPhone: <b>${user.phone}</b>\n\n<b>Order</b>\n${order}\nTotal Order Money: ${user.totalMoney}\nOrder Time: ${user.date}`;
};

const getOrderString = (user: IUserInfo): string => {
  return user.order.reduce((acc, elem) => {
    acc = `${acc}id: <b>${elem.id}</b>\nTitle: <i>${elem.title}</i>\nCount: <b>${elem.count}</b>\n\n`;
    return acc;
  }, '');
};
