export interface IProducts {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}

export interface IProductsBasket {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  count: number;
}

export interface IUserInfo {
  name: string;
  email: string;
  phone: string;
  order: IFilteredProduct[];
  totalMoney: string;
  date: string;
}

export interface IUserOrder {
  email: string;
  phone: string;
  order: IFilteredProduct[];
  totalMoney: string;
  date: string;
}

export interface IFilteredProduct {
  id: number;
  title: string;
  count: number;
}

export interface INewUserLoginInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IResponseCreateNewUser {
  message: string;
  userFullName: string;
  userEmail: string;
}

export interface IExistUserLoginInfo {
  email: string;
  password: string;
}

export interface IUserLogin {
  isAdminLogin: boolean;
  userFullName: string;
  loginInfoData: string;
  userEmail: string;
}

export interface INewUserLogin {
  message: string;
  fullName: string;
  email: string;
}

export interface INewAccAdmin {
  oldPassword: string;
  newLogin: string;
  newPassword: string;
}

export interface IChangeAccAdmin {
  operationStatus: boolean;
  errMessage: string;
  infoMessage: string;
}

export interface IExistUserData {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orders: IUserOrder[];
}
