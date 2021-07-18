import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ACTIONS_LOGIN, IStore } from '../../../redux/constants';
import { mainColor } from '../../../utils/colors';
import { IExistUserLoginInfo } from '../../../utils/interfaces';

const ContentContainer = styled.div`
  position: relative;
  width: 300px;
  height: 250px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  background-color: #b0b0b0;
  justify-content: center;
  align-items: center;
  border-radius: 15px 15px 0 0;
`;

const Information = styled.p`
  font-size: 30px;
`;

const InfoText = styled.p`
  font-size: 20px;
  padding: 10px 0;
`;

const InputLoginInfo = styled.input`
  padding-left: 15px;
  height: 30px;
  font-size: 20px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  width: 300px;
  height: 70px;
  background-color: ${mainColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0 0 15px 15px;
`;

const ButtonAction = styled.button`
  width: 120px;
  height: 35px;
  font-size: 20px;
`;

const ChangeModalType = styled.div`
  width: 85px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 4%;
  right: 3%;
  cursor: pointer;
  color: ${mainColor};
  transition: all 0.3s ease-in;
  &:hover {
    color: whitesmoke;
    background-color: ${mainColor};
  }
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  position: absolute;
  color: red;
  bottom: 15px;
`;

const onClickContent = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
};

interface IModalLoginExistUser {
  closeModalLogin(): void;
  changeModalType(): void;
}

export const ModalLoginUser: React.FC<IModalLoginExistUser> = ({ closeModalLogin, changeModalType }) => {
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const refInput = useRef<HTMLInputElement>(null);
  const errorMessage = useSelector((store: IStore) => store.loginReducer.error);
  const isUserLogin = useSelector((store: IStore) => store.loginReducer.isUserLogin);

  useEffect(() => {
    (refInput.current as HTMLInputElement).focus();
  }, []);

  useEffect(() => {
    const pressEnter = (ev: KeyboardEvent): void => {
      if (ev.key === 'Enter') {
        const existUserInfo = { email, password } as IExistUserLoginInfo;
        dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_EXIST_USER, existUserInfo });
      }
    };

    window.addEventListener('keydown', pressEnter);
    
    return () => {
      dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_FAILURE, error: '' });
      window.removeEventListener('keydown', pressEnter);
    };
  }, [dispatch, email, password]);

  useEffect(() => {
    if (isUserLogin) {
      closeModalLogin();
    }
  }, [isUserLogin]);

  const loginExistUser = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    const existUserInfo = { email, password } as IExistUserLoginInfo;
    dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_EXIST_USER, existUserInfo });
  };

  const inputLoginData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };

  const inputPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <ContentContainer onClick={onClickContent}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ChangeModalType onClick={changeModalType}> New User </ChangeModalType>
        <Information>Log in </Information>
        <InfoText> Email </InfoText>
        <InputLoginInfo onChange={inputLoginData} value={email} ref={refInput} />
        <InfoText> Password </InfoText>
        <InputLoginInfo type="password" onChange={inputPasswordData} value={password} />
      </ContentContainer>
      <ButtonContainer onClick={onClickContent}>
        <ButtonAction onClick={closeModalLogin}> Cancel</ButtonAction>
        <ButtonAction onClick={loginExistUser}> Login</ButtonAction>
      </ButtonContainer>
    </>
  );
};
