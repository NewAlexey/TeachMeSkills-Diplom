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
  cursor: 'pointer',
} as CSSProperties;

const BasketContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 78px;
  top: 44px;
`;

const CountProductInBasket = styled.p`
  width: 25px;
  height: 24px;
  position: absolute;
  background-color: white;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  text-align: center;
`;

const UserLoginContainer = styled.div`
  position: absolute;
  right: -18px;
`;

const LoginContainerWithUserName = styled.div`
  width: 200px;
  height: 45px;
  border-left: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
  border-right: 1px solid ${mainColor};
  border-radius: 0 0 20px 25px;
  position: absolute;
  font-size: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  cursor: default;
  text-align: center;
  box-shadow: 0px 3px 10px 5px rgb(53 0 212 / 30%);
`;

const LoginContainer = styled(LoginContainerWithUserName)`
  cursor: pointer;
  color: #000;
  transition: all 0.3s ease-in;
  right: -220px;
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
  right: -185px;
  top: 45px;
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
  right: -100px;
`;

const Logo = styled.img`
  position: absolute;
  width: 120px;
  left: -100px;
  box-shadow: 0px 0px 10px 10px #ffffff;
  cursor: pointer;
  border-radius: 0 0 30px 30px;
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
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory: '',
    });
  };

  const goOrdersList = (): void => {
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory: '',
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
    <HeaderContaier>
      <Logo src="/logo.png" onClick={goMainPage} />
      {isLoginModalOpen && <ModalLogin closeModalLogin={closeModalLogin} />}
      <FontAwesomeIcon icon={faHome} style={HomeStyle} onClick={goMainPage} />
      <BasketContainer>
        <FontAwesomeIcon icon={faShoppingBasket} style={BasketStyle} onClick={goBasketPage} />
        <CountProductInBasket>{productsInBasket.length}</CountProductInBasket>
      </BasketContainer>

      {userData ? (
        <UserLoginContainer>
          <LoginContainerWithUserName>{userData}</LoginContainerWithUserName>
          <OrdersContainer onClick={goOrdersList}>Orders</OrdersContainer>
          <LogoutContainer onClick={logoutUser}>Logout</LogoutContainer>
        </UserLoginContainer>
      ) : (
        <LoginContainer onClick={openLoginModal}>Login</LoginContainer>
      )}

      <HeaderContent>
        {categories.map((elem) => {
          return <Category key={getID()} catName={elem} selectCategory={currentCategory} isHeader={true} />;
        })}
      </HeaderContent>
    </HeaderContaier>
  );
};
