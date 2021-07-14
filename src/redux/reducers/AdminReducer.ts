import { IExistUserData, INewAccAdmin, IProducts } from '../../utils/interfaces';
import { ACTIONS_ADMIN_DATA } from '../constants';

export interface IAdminReducer {
  error: string;
  categoriesList: string[];
  productsList: IProducts[];
  usersList: IExistUserData[];
  changeAccAdminStatus: boolean;
  changeAccAdminInfo: string;
}

export interface IAdminReducerAction {
  type: string;
  error: string;
  categoriesList: string[];
  productsList: IProducts[];
  usersList: IExistUserData[];
  newAccAdmin: INewAccAdmin;
  changeAccAdminStatus: boolean;
  changeAccAdminInfo: string;
}

const defaultState: IAdminReducer = {
  error: '',
  categoriesList: [],
  productsList: [],
  usersList: [],
  changeAccAdminStatus: false,
  changeAccAdminInfo: '',
};

export function adminReducer(state = defaultState, action: IAdminReducerAction): IAdminReducer {
  switch (action.type) {
    case ACTIONS_ADMIN_DATA.GET_PRODUCTS_SUCCESS_ADMIN: {
      return { ...state, productsList: [...action.productsList] };
    }
    case ACTIONS_ADMIN_DATA.GET_PRODUCTS_FAILURE_ADMIN: {
      return { ...state, error: action.error };
    }
    case ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_SUCCESS: {
      return { ...state, changeAccAdminInfo: action.changeAccAdminInfo };
    }
    case ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_FAILURE: {
      return { ...state, error: action.error };
    }
    case ACTIONS_ADMIN_DATA.GET_USERS_SUCCESS_ADMIN: {
      return { ...state, usersList: [...action.usersList] };
    }
    case ACTIONS_ADMIN_DATA.GET_USERS_FAILURE_ADMIN: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}
