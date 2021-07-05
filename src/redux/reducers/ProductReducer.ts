import { IProducts } from '../../utils/interfaces';
import { ACTIONS_PRODUCTS } from '../constants';

export interface IProductReducer {
  products: IProducts[];
  error: string;
}

interface IActionInterface {
  type: string;
  products: IProducts[];
  error: string;
}

const defaultState: IProductReducer = {
  products: [],
  error: '',
};

export function productReducer(state = defaultState, action: IActionInterface): IProductReducer {
  switch (action.type) {
    case ACTIONS_PRODUCTS.GET_PRODUCTS_SUCCESS: {
      return { ...state, products: [...action.products] };
    }
    case ACTIONS_PRODUCTS.GET_PRODUCTS_FAILURE: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}
