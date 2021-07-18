import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ACTIONS_APP, IStore } from '../../../redux/constants';
import getRandomProducts from '../../../utils/get-random-number';
import { IProducts } from '../../../utils/interfaces';
import { Product } from './Product';

const ContentContainer = styled.section`
  width: 80%;
  min-height: 600px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-radius: 130px 130px 0 0;
  box-shadow: 0px 0px 15px 15px #ffffff;
  position: relative;
`;

const Header = styled.span`
  color: #757575;
  font-size: 25px;
  position: absolute;
  left: calc(50% - 105px);
  width: 210px;
`;

const ButtonGetRandom = styled.button`
  padding: 5px 10px;
  position: absolute;
  right: 100px;
`;

const getArrRandomProducts2 = (arrProducts: IProducts[], arrIndex: number[]): IProducts[] => {
  let randomProductArr = [] as IProducts[];
  arrIndex.forEach((elem) => {
    randomProductArr.push(arrProducts[elem]);
  });
  return randomProductArr;
};

export const MainContent: React.FC = () => {
  const dispatch = useDispatch();
  const listProducts = useSelector((store: IStore) => store.productReducer.products);
  const randomIndexes = useSelector((store: IStore) => store.appReducer.randomIndexes);
  const [randomProducts, setRandomProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const randomProducts = getArrRandomProducts2(listProducts, randomIndexes);
    setRandomProducts(randomProducts);
  }, [listProducts]);

  const getNewRandomProducts = (): void => {
    const randomIndexes = getRandomProducts();
    dispatch({
      type: ACTIONS_APP.RANDOM_INDEXS,
      randomIndexes,
    });
    const randomProducts = getArrRandomProducts2(listProducts, randomIndexes);
    setRandomProducts(randomProducts);
  };

  return (
    <>
      <ContentContainer>
        <Header> Random Products</Header>
        <ButtonGetRandom onClick={getNewRandomProducts}>I'm Feeling Lucky</ButtonGetRandom>
        {randomIndexes.length !== 0
          ? randomProducts.map((elem) => {
              return <Product key={elem.id} product={elem} />;
            })
          : null}
      </ContentContainer>
    </>
  );
};
