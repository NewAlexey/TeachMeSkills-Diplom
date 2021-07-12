import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_APP } from '../../../redux/constants';

import { IProductsBasket } from '../../../utils/interfaces';

interface IPriceAndCountInfo {
  product: IProductsBasket;
}

const PriceAndCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  margin-top: 80px;
`;

const PriceInfo = styled.p`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const PriceText = styled.p`
  font-size: 20px;
`;

const Price = styled.p`
  font-size: 25px;
  color: #8d33da;
  padding: 5px;
`;

const CountInfoContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 30px;
`;

const MinusCount = styled.button`
  padding: 5px 10px;
  z-index: 10;
`;

const Count = styled.span`
  display: block;
  width: 20px;
  padding: 10px;
  font-size: 22px;
`;

const PlusCount = styled.button`
  padding: 5px 10px;
  z-index: 10;
`;

export const PriceAndCountInfo: React.FC<IPriceAndCountInfo> = ({ product }): JSX.Element => {
  const [countProduct, setCountProduct] = useState(1);
  const [totalPriceForProduct, setTotalPriceForProduct] = useState(product.price);
  const dispatch = useDispatch();

  const minusProduct = (): void => {
    if (countProduct > 1) {
      const newCount = countProduct - 1;
      const totalPrice = (newCount * product.price).toFixed(2);
      setTotalPriceForProduct(+totalPrice);
      setCountProduct(newCount);
      const idChangedProduct = product.id;
      dispatch({
        type: ACTIONS_APP.MINUS_COUNT_PRODUCT,
        idChangedProduct,
      });
    }
  };

  const plusProduct = (): void => {
    const newCount = countProduct + 1;
    const totalPrice = (newCount * product.price).toFixed(2);
    setTotalPriceForProduct(+totalPrice);
    setCountProduct(newCount);
    const idChangedProduct = product.id;
    dispatch({
      type: ACTIONS_APP.PLUS_COUNT_PRODUCT,
      idChangedProduct,
    });
  };

  return (
    <PriceAndCountContainer>
      <PriceInfo>Total Price</PriceInfo>
      <Price>${totalPriceForProduct}</Price>
      <CountInfoContainer>
        <MinusCount onClick={minusProduct}>-</MinusCount>
        <Count>{countProduct}</Count>
        <PlusCount onClick={plusProduct}>+</PlusCount>
      </CountInfoContainer>
      <PriceInfo>Price for 1 product</PriceInfo>
      <PriceText> ${product.price}</PriceText>
    </PriceAndCountContainer>
  );
};
