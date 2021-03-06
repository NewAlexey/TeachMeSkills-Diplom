import { discounts } from '../../utils/discounts';
import { IProducts, IProductsBasket, IUserInfo, IUserOrder } from '../../utils/interfaces';
import { ACTIONS_APP } from '../constants';

export interface IAppReducer {
  error: string;
  orderTotalMoney: string;
  isFreezeSideMenu: boolean;
  isOpenModalOrder: boolean;
  randomIndexes: number[];
  currentCategory: string;
  currentDiscount: number;
  productsInBasket: IProductsBasket[];
  listDicsountCode: Map<string, number>;
  orderError: string;
  orderStatus: string;
  isAdminLogin: boolean;
  userOrders: IUserOrder[];
}

export interface IActionInterface {
  type: string;
  error: string;
  orderTotalMoney: string;
  isFreezeSideMenu: boolean;
  isOpenModalOrder: boolean;
  randomIndexes: number[];
  addSelectedProduct: IProducts;
  deleteSelectedProduct: number;
  currentCategory: string;
  currentDiscount: number;
  productsInBasket: IProductsBasket[];
  idChangedProduct: number;
  userInfo: IUserInfo;
  userEmail: string;
  userOrders: IUserOrder[];
  orderError: string;
  orderStatus: string;
  isAdminLogin: boolean;
}

const defaultState: IAppReducer = {
  error: '',
  orderTotalMoney: '',
  isFreezeSideMenu: false,
  isOpenModalOrder: false,
  currentDiscount: 0,
  randomIndexes: [],
  listDicsountCode: discounts,
  currentCategory: '',
  productsInBasket: [],
  orderError: '',
  orderStatus: '',
  isAdminLogin: false,
  userOrders: [],
};

export function appReducer(state = defaultState, action: IActionInterface): IAppReducer {
  switch (action.type) {
    case ACTIONS_APP.FREEZE_SIDE_MENU: {
      return { ...state, isFreezeSideMenu: !state.isFreezeSideMenu };
    }
    case ACTIONS_APP.IS_OPEN_MODAL_ORDER: {
      return { ...state, isOpenModalOrder: !state.isOpenModalOrder };
    }
    case ACTIONS_APP.CURRENT_CATEGORY: {
      return { ...state, currentCategory: action.currentCategory };
    }
    case ACTIONS_APP.ORDER_TOTAL_MONEY: {
      return { ...state, orderTotalMoney: action.orderTotalMoney };
    }
    case ACTIONS_APP.RANDOM_INDEXS: {
      return { ...state, randomIndexes: action.randomIndexes };
    }
    case ACTIONS_APP.ADD_PRODUCT: {
      let productsInBasket = {} as IProductsBasket;
      productsInBasket = { ...action.addSelectedProduct, count: 1 };
      return { ...state, productsInBasket: [...state.productsInBasket, { ...productsInBasket }] };
    }
    case ACTIONS_APP.DELETE_PRODUCT: {
      const updatedArr = state.productsInBasket.filter((elem) => elem.id !== action.deleteSelectedProduct);
      return { ...state, productsInBasket: [...updatedArr] };
    }
    case ACTIONS_APP.CLEAR_BASKET: {
      return { ...state, productsInBasket: [] };
    }
    case ACTIONS_APP.SET_DISCOUNT: {
      return { ...state, currentDiscount: action.currentDiscount };
    }
    case ACTIONS_APP.PLUS_COUNT_PRODUCT: {
      const newBasketProduct = state.productsInBasket.map((elem) => {
        if (elem.id === action.idChangedProduct) {
          const updatedCountOfProduct = { ...elem };
          updatedCountOfProduct.count += 1;
          return updatedCountOfProduct;
        }
        return elem;
      });
      return { ...state, productsInBasket: [...newBasketProduct] };
    }
    case ACTIONS_APP.MINUS_COUNT_PRODUCT: {
      const newBasketProduct = state.productsInBasket.map((elem) => {
        if (elem.id === action.idChangedProduct) {
          const updatedCountOfProduct = { ...elem };
          updatedCountOfProduct.count -= 1;
          return updatedCountOfProduct;
        }
        return elem;
      });
      return { ...state, productsInBasket: [...newBasketProduct] };
    }
    case ACTIONS_APP.SEND_INFO_TG_SUCCESS: {
      return { ...state, orderStatus: action.orderStatus };
    }
    case ACTIONS_APP.SEND_INFO_TG_FAILURE: {
      return { ...state, orderError: action.orderError };
    }
    case ACTIONS_APP.GET_USER_ORDERS_SUCCESS: {
      return { ...state, userOrders: [...action.userOrders] };
    }
    case ACTIONS_APP.GET_USER_ORDERS_FAILURE: {
      return { ...state, error: action.error };
    }
    case ACTIONS_APP.LOGOUT_USER: {
      const newArr = state.userOrders;
      newArr.length = 0;
      return { ...state, userOrders: [...newArr] };
    }
    default:
      return state;
  }
}
