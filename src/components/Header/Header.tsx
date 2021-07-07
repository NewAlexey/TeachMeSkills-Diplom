import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';

import { ACTIONS_APP, IStore } from '../../redux/constants';
import getID from '../../utils/get-random-id';
import { Category } from './Categories';

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
  position: 'fixed',
  fontSize: '40px',
  color: '#8d33da',
  top: '1%',
  left: '11%',
  cursor: 'pointer',
} as CSSProperties;

const BasketStyle = {
  position: 'fixed',
  fontSize: '40px',
  color: '#8d33da',
  top: '1%',
  right: '11%',
  cursor: 'pointer',
} as CSSProperties;

const CountProductInBasket = styled.p`
  width: 23px;
  height: 23px;
  position: fixed;
  background-color: white;
  right: 10%;
  border-radius: 50%;
  text-align: center;
`;

export const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector((store: IStore) => store.categoriesReducer.categories);
  const currentCategory = useSelector((store: IStore) => store.appReducer.currentCategory);
  const productsInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);

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

  return (
    <>
      <HeaderContaier>
        <FontAwesomeIcon icon={faHome} style={HomeStyle} onClick={goMainPage} />
        <FontAwesomeIcon icon={faShoppingBasket} style={BasketStyle} onClick={goBasketPage} />
        <CountProductInBasket>{productsInBasket.length}</CountProductInBasket>
        <HeaderContent>
          {categories.map((elem) => {
            return <Category key={getID()} catName={elem} selectCategory={currentCategory} isHeader={true} />;
          })}
        </HeaderContent>
      </HeaderContaier>
    </>
  );
};
