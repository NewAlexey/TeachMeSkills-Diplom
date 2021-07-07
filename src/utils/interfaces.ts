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

export interface IFilteredProduct {
  id: number;
  title: string;
  count: number;
}
