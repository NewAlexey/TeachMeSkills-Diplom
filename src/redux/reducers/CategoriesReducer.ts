import { ACTIONS_CATEGORIES } from '../constants';

export interface ICategoriesReducer {
  error: string;
  categories: string[];
}

interface IActionInterface {
  type: string;
  categories: string[];
  error: string;
}

const defaultState: ICategoriesReducer = {
  error: '',
  categories: [],
};

export function categoriesReducer(state = defaultState, action: IActionInterface): ICategoriesReducer {
  switch (action.type) {
    case ACTIONS_CATEGORIES.GET_CATEGORIES_SUCCESS: {
      return { ...state, categories: [...action.categories] };
    }
    case ACTIONS_CATEGORIES.GET_CATEGORIES_FAILURE: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}
