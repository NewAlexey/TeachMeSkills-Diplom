import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ACTIONS_APP, IStore } from '../../redux/constants';
import { getDate } from '../../utils/get-date';
import { IFilteredProduct, IUserInfo } from '../../utils/interfaces';
import { checkEmail } from '../../utils/validate-email-order';
import { checkNameLength, checkNameLetters } from '../../utils/validate-name-order';
import { checkPhone, checkPhoneSymbols } from '../../utils/validate-phone-order';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000000cc;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
`;

const Container = styled.div`
  background: #6d6d6d;
  border-radius: 12px;
  width: fit-content;
  height: fit-content;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 100%;
  bottom: 30px;
`;

const OrderInfo = styled.p`
  font-size: 30px;
  text-align: center;
`;

const NameContainer = styled.div`
  width: 300px;
`;

const NameInfo = styled.p`
  font-size: 18px;
  color: #ffffff;
  padding: 15px 0;
`;

interface INameInput {
  isValidName: boolean;
}

const NameInput = styled.input<INameInput>`
  width: 260px;
  padding-left: 20px;
  height: 30px;
  font-size: 17px;
  box-shadow: 0px 0px 10px 5px #fd7070;
  ${(props): string => (props.isValidName ? `  box-shadow: 0px 0px 10px 5px #5ff53a;` : '')};
`;

interface IEmailInput {
  isValidEmail: boolean;
}

const EmailInput = styled.input<IEmailInput>`
  width: 260px;
  padding-left: 20px;
  height: 30px;
  font-size: 17px;
  box-shadow: 0px 0px 10px 5px #fd7070;
  ${(props): string => (props.isValidEmail ? `  box-shadow: 0px 0px 10px 5px #5ff53a;` : '')};
`;

interface IPhoneInput {
  isValidPhone: boolean;
}

const PhoneInput = styled.input<IPhoneInput>`
  width: 260px;
  padding-left: 20px;
  height: 30px;
  font-size: 17px;
  box-shadow: 0px 0px 10px 5px #fd7070;
  ${(props): string => (props.isValidPhone ? `  box-shadow: 0px 0px 10px 5px #5ff53a;` : '')};
`;

interface IButtonSubmit {
  isAllInputsValid: boolean;
}

const ButtonSubmit = styled.button<IButtonSubmit>`
  margin-top: 40px;
  width: 284px;
  padding: 10px;
  font-size: 18px;
  ${({ isAllInputsValid }): string => (!isAllInputsValid ? `{opacity: 0.5; pointer-events: none}` : '')}
`;

export const ModalOrder: React.FC = () => {
  const productsInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);
  const orderTotalMoney = useSelector((store: IStore) => store.appReducer.orderTotalMoney);
  const orderStatus = useSelector((store: IStore) => store.appReducer.orderStatus);
  const orderError = useSelector((store: IStore) => store.appReducer.orderError);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isAllInputsValid, setIsAllInputsValid] = useState(false);
  const dispatch = useDispatch();
  const closeModal = (): void => {
    dispatch({
      type: ACTIONS_APP.IS_OPEN_MODAL_ORDER,
    });
  };

  // useEffect(() => {
  //   if (orderStatus) {
  //     alert(`Status: ${orderStatus}. I see your order in Telegramm and write.`);
  //     dispatch({
  //       type: ACTIONS_APP.IS_OPEN_MODAL_ORDER,
  //     });
  //   }
  // }, [orderStatus]);

  // useEffect(() => {
  //   if (orderError) {
  //     alert(`Something wrong...${orderError}`);
  //     dispatch({
  //       type: ACTIONS_APP.IS_OPEN_MODAL_ORDER,
  //     });
  //   }
  // }, [orderError]);

  useEffect(() => {
    isValidName && isValidPhone && isValidEmail && setIsAllInputsValid(true);
  }, [isValidName, isValidPhone, isValidEmail]);

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    const isNameValid = checkNameLetters(value);
    isNameValid ? setUserName(value) : setUserName(value.slice(0, value.length - 1));
    checkNameLength(value) ? setIsValidName(true) : setIsValidName(false);
  };
  const changeUserEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    const isEmailValid = checkEmail(value);
    setUserEmail(value);
    isEmailValid ? setIsValidEmail(true) : setIsValidEmail(false);
  };
  const changeUserPhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as string;
    const isValidSymbolPhone = checkPhoneSymbols(value);
    if (!isValidSymbolPhone) {
      setUserPhone(value.slice(0, value.length - 1));
      return;
    }
    if (value.length <= 12) {
      setUserPhone(value);
      const isPhoneValid = checkPhone(value);
      isPhoneValid ? setIsValidPhone(true) : setIsValidPhone(false);
      return;
    }
    setUserPhone(value.slice(0, value.length - 1));
  };

  const sendOrderRequest = (): void => {
    if (isValidName && isValidPhone && isValidEmail) {
      const filteredProduct = productsInBasket.map((elem) => {
        let filteredElem = {} as IFilteredProduct;
        filteredElem.id = elem.id;
        filteredElem.title = elem.title;
        filteredElem.count = elem.count;
        return filteredElem;
      });
      const date = getDate();
      const userInfo: IUserInfo = {
        name: userName,
        email: userEmail,
        phone: userPhone,
        order: filteredProduct,
        totalMoney: `$${orderTotalMoney}`,
        date: date,
      };
      dispatch({
        type: ACTIONS_APP.SEND_INFO_TG_REQUEST,
        userInfo,
      });
      dispatch({
        type: ACTIONS_APP.IS_OPEN_MODAL_ORDER,
      });
      dispatch({
        type: ACTIONS_APP.CLEAR_BASKET,
      });
    }
  };

  return (
    <Background onClick={closeModal}>
      <Container onClick={(event) => event.stopPropagation()}>
        <OrderInfo>Order Info</OrderInfo>
        <CloseButton onClick={closeModal}>&#10006;</CloseButton>
        <NameContainer>
          <NameInfo>1) Write Your Full Name </NameInfo>
          <NameInput onChange={changeUserName} value={userName} isValidName={isValidName}></NameInput>
        </NameContainer>
        <NameContainer>
          <NameInfo>2) Write Your Email </NameInfo>
          <EmailInput onChange={changeUserEmail} value={userEmail} isValidEmail={isValidEmail}></EmailInput>
        </NameContainer>
        <NameContainer>
          <NameInfo>3) Write Your Phone</NameInfo>
          <PhoneInput
            onChange={changeUserPhone}
            value={userPhone}
            isValidPhone={isValidPhone}
            placeholder="29 123 456 78"
          ></PhoneInput>
        </NameContainer>
        <ButtonSubmit onClick={sendOrderRequest} isAllInputsValid={isAllInputsValid}>
          Confirm and Send Info
        </ButtonSubmit>
      </Container>
    </Background>
  );
};
