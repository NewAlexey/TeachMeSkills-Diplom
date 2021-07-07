import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IStore } from '../../redux/constants';
import { backgroundColor } from '../../utils/colors';
import { BasketInformation } from './BasketInformation';
import { ProductInBasket } from './ProductBasket';

const BasketContainer = styled.section`
  width: 80%;
  background-color: ${backgroundColor};
  margin: 150px auto 100px auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ProductContainer = styled.div`
  margin: 15px 0;
`;

export const Basket = (): JSX.Element => {
  const productsInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);

  return (
    <>
      <BasketContainer>
        <BasketInformation />
        <ProductContainer>
          {productsInBasket.length !== 0 ? productsInBasket.map((elem) => {
            return <ProductInBasket key={elem.id} product={elem} />
          }) : null}
        </ProductContainer>
      </BasketContainer>
    </>
  );
};
