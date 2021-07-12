import { useSelector, useDispatch } from 'react-redux';
import { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import getID from '../../../utils/get-random-id';
import { IStore, ACTIONS_APP, ACTIONS_LOGIN } from '../../../redux/constants';
import { mainColor } from '../../../utils/colors';
import { ModalLogin } from '../../Modal/ModalLogin';
import { Category } from './Category';

const HeaderContaier = styled.header`
  width: 80%;
  height: 50px;
  position: absolute;
  top: 0px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 90px;
  display: flex;
  border-radius: 0 0 50px 50px;
  color: #a8a8a8;
`;

const HomeStyle = {
  position: 'absolute',
  fontSize: '35px',
  color: '#8d33da',
  top: '45px',
  left: '7%',
  cursor: 'pointer',
} as CSSProperties;

const BasketStyle = {
  position: 'absolute',
  fontSize: '35px',
  color: '#8d33da',
  top: '45px',
  right: '7%',
  cursor: 'pointer',
} as CSSProperties;

const CountProductInBasket = styled.p`
  width: 25px;
  height: 24px;
  position: absolute;
  background-color: white;
  right: 72px;
  top: 31px;
  border-radius: 50%;
  text-align: center;
`;

const LoginContainerWithUserName = styled.div`
  width: 200px;
  height: 35px;
  border-left: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
  border-right: 1px solid ${mainColor};
  border-radius: 0 0 20px 25px;
  position: absolute;
  font-size: 19px;
  right: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  cursor: default;
  box-shadow: 0px 3px 10px 5px rgb(53 0 212 / 30%);
`;

const LoginContainer = styled(LoginContainerWithUserName)`
  cursor: pointer;
  color: #000;
  transition: all 0.3s ease-in;
  box-shadow: 0px 3px 10px 5px rgb(53 0 212 / 30%);
  &:hover {
    background-color: ${mainColor};
    color: #fff;
  }
`;

const LogoutContainer = styled.div`
  width: 75px;
  height: 25px;
  border-left: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
  border-right: 1px solid ${mainColor};
  border-radius: 0 0 20px 25px;
  position: absolute;
  font-size: 15px;
  right: -19%;
  top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  transition: all 0.3s ease-in;
  box-shadow: 0px 3px 10px 5px rgb(53 0 212 / 30%);
  &:hover {
    background-color: ${mainColor};
    color: #fff;
  }
`;

const OrdersContainer = styled(LogoutContainer)`
  right: -11%;
`;

export const HeaderUser = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((store: IStore) => store.categoriesReducer.categories);
  const currentCategory = useSelector((store: IStore) => store.appReducer.currentCategory);
  const productsInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);
  const userData = useSelector((store: IStore) => store.loginReducer.userFullName);
  const [isLoginModalOpen, setIsOpenModalOpen] = useState(false);

  const goMainPage = (): void => {
    history.push('/main');
    const currentCategory = '';
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory,
    });
  };

  const goBasketPage = (): void => {
    history.push('/basket');
    const currentCategory = '';
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory,
    });
  };

  const goOrdersList = (): void => {
    const currentCategory = '';
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory,
    });
    const userName = userData.split(' ').join('');
    history.push(`/orders/${userName}`);
  };

  const openLoginModal = (): void => {
    setIsOpenModalOpen(true);
  };

  const closeModalLogin = (): void => {
    setIsOpenModalOpen(false);
  };

  const logoutUser = (): void => {
    dispatch({ type: ACTIONS_LOGIN.APP_LOGOUT_USER });
    history.push('/main');
    dispatch({ type: ACTIONS_APP.LOGOUT_USER });
  };

  return (
    <>
      <HeaderContaier>
        {isLoginModalOpen && <ModalLogin closeModalLogin={closeModalLogin} />}
        <FontAwesomeIcon icon={faHome} style={HomeStyle} onClick={goMainPage} />
        <FontAwesomeIcon icon={faShoppingBasket} style={BasketStyle} onClick={goBasketPage} />
        <CountProductInBasket>{productsInBasket.length}</CountProductInBasket>
        {userData ? (
          <>
            <LoginContainerWithUserName>{userData}</LoginContainerWithUserName>
            <LogoutContainer onClick={logoutUser}>Logout</LogoutContainer>
            <OrdersContainer onClick={goOrdersList}>Orders</OrdersContainer>
          </>
        ) : (
          <LoginContainer onClick={openLoginModal}>Login</LoginContainer>
        )}

        <HeaderContent>
          {categories.map((elem) => {
            return <Category key={getID()} catName={elem} selectCategory={currentCategory} isHeader={true} />;
          })}
        </HeaderContent>
      </HeaderContaier>
    </>
  );
};
