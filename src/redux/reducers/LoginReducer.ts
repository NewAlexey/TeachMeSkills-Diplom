import { IExistUserLoginInfo, INewUserLogin, INewUserLoginInfo, IUserLogin } from '../../utils/interfaces';
import { ACTIONS_LOGIN } from '../constants';

export interface ILoginReducer {
  isAdminLogin: boolean;
  isUserLogin: boolean;
  userFullName: string;
  userEmail: string;
  error: string;
}

export interface ILoginActionInterface {
  type: string;
  error: string;
  isAdminLogin: boolean;
  isUserLogin: boolean;
  existUserInfo: IExistUserLoginInfo;
  newUserInfo: INewUserLoginInfo;
  userData: IUserLogin;
  newUserLogin: INewUserLogin;
}

const defaultState: ILoginReducer = {
  isAdminLogin: false,
  isUserLogin: false,
  userFullName: '',
  userEmail: '',
  error: '',
};

export function loginReducer(state = defaultState, action: ILoginActionInterface): ILoginReducer {
  switch (action.type) {
    case ACTIONS_LOGIN.USER_LOGIN_SUCCESS: {
      const { userFullName } = action.userData;
      const { userEmail } = action.userData;
      console.log(action);
      return { ...state, userFullName: userFullName, userEmail: userEmail, isUserLogin: true };
    }
    case ACTIONS_LOGIN.ADMIN_LOGIN_SUCCESS: {
      return { ...state, isAdminLogin: action.isAdminLogin };
    }
    case ACTIONS_LOGIN.APP_LOGIN_FAILURE: {
      return { ...state, error: action.error };
    }
    case ACTIONS_LOGIN.APP_LOGOUT_ADMIN: {
      return { ...state, isAdminLogin: !state.isAdminLogin };
    }
    case ACTIONS_LOGIN.APP_LOGOUT_USER: {
      return { ...state, isUserLogin: false, userEmail: '', userFullName: '' };
    }
    default:
      return state;
  }
}
