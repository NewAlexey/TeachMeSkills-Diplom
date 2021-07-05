import { ICategoriesReducer, IProductReducer, IAppReducer } from './reducers';

export enum ACTIONS_APP {
  FREEZE_SIDE_MENU = 'FREEZE_SIDE_MENU',
  RANDOM_INDEXS = 'RANDOM_INDEXS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export enum ACTIONS_CATEGORIES {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE',
}

export enum ACTIONS_PRODUCTS {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE',
}

export interface IStore {
  categoriesReducer: ICategoriesReducer;
  productReducer: IProductReducer;
  appReducer: IAppReducer;
}
