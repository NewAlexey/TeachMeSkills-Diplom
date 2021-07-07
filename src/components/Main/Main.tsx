import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ACTIONS_APP, ACTIONS_CATEGORIES, ACTIONS_PRODUCTS } from '../../redux/constants';
import getRandomProducts from '../../utils/get-random-number';
import { Carousel } from './Carousel/Carousel';
import { MainContent } from './MainContent';

const MainContainer = styled.main`
  margin: 70px auto;
`;

export const Main = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ACTIONS_CATEGORIES.GET_CATEGORIES,
    });
    dispatch({
      type: ACTIONS_PRODUCTS.GET_PRODUCTS,
    });
    const randomIndexes = getRandomProducts();
    dispatch({
      type: ACTIONS_APP.RANDOM_INDEXS,
      randomIndexes,
    });
  }, [dispatch]);

  return (
    <>
      <MainContainer>
        <Carousel />
        <MainContent />
      </MainContainer>
    </>
  );
};
