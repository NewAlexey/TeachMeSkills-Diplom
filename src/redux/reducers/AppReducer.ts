import { ACTIONS_APP } from '../constants';

export interface IAppReducer {
  isFreezeSideMenu: boolean;
  randomIndexes: number[];
  addedId: number;
  deletedId: number;
  idProductsInBasket: number[];  
}

interface IActionInterface {
  type: string;
  isFreezeSideMenu: boolean;
  randomIndexes: number[];
  addedId: number;
  deletedId: number;
  idProductsInBasket: number[];
}

const defaultState: IAppReducer = {
  isFreezeSideMenu: false,
  randomIndexes: [],
  addedId: 0,
  deletedId: 0,
  idProductsInBasket: [],
};

export function appReducer(state = defaultState, action: IActionInterface): IAppReducer {
  switch (action.type) {
    case ACTIONS_APP.FREEZE_SIDE_MENU: {
      return { ...state, isFreezeSideMenu: !state.isFreezeSideMenu };
    }
    case ACTIONS_APP.RANDOM_INDEXS: {
      return { ...state, randomIndexes: action.randomIndexes };
    }
    case ACTIONS_APP.ADD_PRODUCT: {
      const updatedArrId = [...state.idProductsInBasket];
      updatedArrId.push(action.addedId);
      return { ...state, idProductsInBasket: updatedArrId };
    }
    case ACTIONS_APP.DELETE_PRODUCT: {
      const updatedArrId = state.idProductsInBasket.filter((elem) => elem !== action.deletedId);
      return { ...state, idProductsInBasket: updatedArrId };
    }
    default:
      return state;
  }
}
