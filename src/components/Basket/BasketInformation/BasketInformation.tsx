import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { IStore, ACTIONS_APP } from '../../../redux/constants';
import { backgroundColor, mainColor } from '../../../utils/colors';

const StickyContainer = styled.div`
  position: sticky;
  top: 70px;
  z-index: 5;
`;

const TotalInformationContainer = styled.div`
  height: 150px;
  border: 1px solid black;
  margin: 0 auto;
  width: 50%;
  display: flex;
  border-radius: 20px;
  background-color: ${backgroundColor};
  box-shadow: 0px 0px 15px 15px #ffffff;
`;

const DiscountContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const DiscountText = styled.p`
  font-size: 20px;
  color: #000000;
`;

const DiscrountInput = styled.input`
  width: 200px;
  height: 30px;
  padding-left: 15px;
`;

const DiscountButton = styled.button`
  width: 132px;
  padding: 3px 0;
  font-size: 17px;
`;

const PriceAndOrderContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  padding-right: 30px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceInfo = styled.p`
  font-size: 20px;
  color: ${mainColor};
`;

const Price = styled.p`
  font-size: 20px;
  width: 100px;
  color: #000000;
  padding: 0px 0 0 40px;
`;

const Discount = styled.p`
  font-size: 17px;
  width: 100px;
  color: #000000;
  padding: 0px 0 0 40px;
`;

const GetOrderButton = styled.button`
  font-size: 20px;
  color: #000000;
  padding: 5px 10px;
  margin-left: 100px;
`;

const BasketHeader = styled.h1`
  font-size: 30px;
  color: ${mainColor};
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BasketInformation = (): JSX.Element => {
  const [countOfMoney, setCountOfMoney] = useState('0');
  const [discountInput, setDiscountInput] = useState('');
  const [counfOfMoneyWithoutDiscount, setCounfOfMoneyWithoutDiscount] = useState('0');
  const dispatch = useDispatch();
  const listDicsountCode = useSelector((store: IStore) => store.appReducer.listDicsountCode);
  const productsInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);
  const currentAppliedDiscount = useSelector((store: IStore) => store.appReducer.currentDiscount);
  const orderTotalMoney = useSelector((store: IStore) => store.appReducer.orderTotalMoney);

  useEffect(() => {
    const totalPrice = productsInBasket
      .reduce((acc, elem) => {
        let price = elem.price;
        price = price * elem.count;
        acc += price;
        return acc;
      }, 0)
      .toFixed(2);
    setCounfOfMoneyWithoutDiscount(totalPrice);
  }, [productsInBasket]);

  useEffect(() => {
    if (currentAppliedDiscount) {
      const orderTotalMoney = (+counfOfMoneyWithoutDiscount * (1 - currentAppliedDiscount)).toFixed(2);
      setCountOfMoney(orderTotalMoney);
      dispatch({
        type: ACTIONS_APP.ORDER_TOTAL_MONEY,
        orderTotalMoney,
      });
    } else {
      const orderTotalMoney = counfOfMoneyWithoutDiscount;
      dispatch({
        type: ACTIONS_APP.ORDER_TOTAL_MONEY,
        orderTotalMoney,
      });
      setCountOfMoney(counfOfMoneyWithoutDiscount);
    }
  }, [counfOfMoneyWithoutDiscount]);

  const inputDiscountCode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDiscountInput(event.target.value);
  };

  const checkDiscountCode = (): void => {
    const currentDiscount = listDicsountCode.get(discountInput);
    if (currentDiscount) {
      if (currentDiscount < currentAppliedDiscount) {
        alert('Your discount is bigger that new discount');
        setDiscountInput('');
        return;
      }
      alert(`Your new discount - ${currentDiscount * 100}%`);
      const newCountOfMoney = (+counfOfMoneyWithoutDiscount * (1 - currentDiscount)).toFixed(2);
      setCountOfMoney(newCountOfMoney);
      setDiscountInput('');
      dispatch({
        type: ACTIONS_APP.SET_DISCOUNT,
        currentDiscount,
      });
    }
  };

  const openModalOrder = (): void => {
    dispatch({
      type: ACTIONS_APP.IS_OPEN_MODAL_ORDER,
    });
  };

  return (
    <StickyContainer>
      <BasketHeader>
        {productsInBasket.length !== 0 ? 'Your Shopping Cart' : 'Your Shopping Cart is Empty yet ;)'}
      </BasketHeader>
      <TotalInformationContainer>
        <DiscountContainer>
          <DiscountText>Enter code for discount</DiscountText>
          <DiscrountInput onChange={inputDiscountCode} value={discountInput} />
          <DiscountButton onClick={checkDiscountCode}> Get Discount</DiscountButton>
        </DiscountContainer>
        <PriceAndOrderContainer>
          <PriceContainer>
            <PriceInfo>Price: </PriceInfo>
            <Price>${counfOfMoneyWithoutDiscount}</Price>
          </PriceContainer>
          <PriceContainer>
            <PriceInfo>Your discount: </PriceInfo>
            <Discount>{currentAppliedDiscount * 100}%</Discount>
          </PriceContainer>
          <PriceContainer>
            <PriceInfo>Total: </PriceInfo>
            <Price>${currentAppliedDiscount ? countOfMoney : counfOfMoneyWithoutDiscount}</Price>
          </PriceContainer>
          <GetOrderButton onClick={openModalOrder}>Click For Order</GetOrderButton>
        </PriceAndOrderContainer>
      </TotalInformationContainer>
    </StickyContainer>
  );
};
