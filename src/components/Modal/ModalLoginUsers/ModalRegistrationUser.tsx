import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_LOGIN, IStore } from '../../../redux/constants';

import { mainColor } from '../../../utils/colors';
import { INewUserLoginInfo } from '../../../utils/interfaces';
import { checkEmail } from '../../../utils/validate-email-order';

const ContentContainer = styled.div`
  position: relative;
  width: 300px;
  height: 470px;
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

interface IButtonLogin {
  isTrueData: boolean;
}

const ButtonLogin = styled.button<IButtonLogin>`
  width: 120px;
  height: 35px;
  font-size: 20px;
  ${({ isTrueData }): string => (isTrueData ? '' : 'opacity: 0.5; pointer-events: none')}
`;

const ChangeModalType = styled.div`
  width: 85px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3%;
  right: 2%;
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
  color: red;
  position: absolute;
  bottom: 1%;
  text-align: center;
`;

const onClickContent = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
};

interface IModalLoginExistUser {
  closeModalLogin(): void;
  changeModalType(): void;
}

export const ModalRegistrationUser: React.FC<IModalLoginExistUser> = ({ closeModalLogin, changeModalType }) => {
  const [newUserData, setNewUserData] = useState<INewUserLoginInfo>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isTrueData, setIsTrueData] = useState(false);
  const [isTrueErrorMessage, setIsTrueErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const isUserLogin = useSelector((store: IStore) => store.loginReducer.isUserLogin);
  const errorMessage = useSelector((store: IStore) => store.loginReducer.error);
  const refInput = useRef<HTMLInputElement>(null);

  const loginNewUser = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_NEW_USER, newUserInfo: newUserData });
  };

  useEffect(() => {
    const pressEnter = (ev: KeyboardEvent): void => {
      if (ev.key === 'Enter') {
        dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_NEW_USER, newUserInfo: newUserData });
      }
    };
    window.addEventListener('keydown', pressEnter);
    return () => {
      dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_FAILURE, error: '' });
      window.removeEventListener('keydown', pressEnter);
    };
  }, [dispatch, newUserData]);

  useEffect(() => {
    if (isUserLogin) {
      closeModalLogin();
    }
  }, [closeModalLogin, isUserLogin]);

  useEffect(() => {
    (refInput.current as HTMLInputElement).focus();
    return () => {
      const emptyUserData = { firstName: '', lastName: '', email: '', password: '' };
      setNewUserData(emptyUserData);
      setIsTrueData(false);
      setIsTrueErrorMessage(false);
      dispatch({
        type: ACTIONS_LOGIN.APP_LOGIN_FAILURE,
        error: '',
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      setIsTrueErrorMessage(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (
      checkEmail(newUserData.email) &&
      newUserData.firstName.length >= 3 &&
      newUserData.lastName.length >= 3 &&
      newUserData.password.length >= 5
    ) {
      setIsTrueData(true);
    }
  }, [newUserData]);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewUserData({ ...newUserData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ContentContainer onClick={onClickContent}>
        <ChangeModalType onClick={changeModalType}> Exist User </ChangeModalType>
        <Information>Sign in</Information>
        <InfoText> First Name </InfoText>
        <InputLoginInfo onChange={inputOnChange} value={newUserData.firstName} ref={refInput} name="firstName" />
        <InfoText> Second Name </InfoText>
        <InputLoginInfo onChange={inputOnChange} value={newUserData.lastName} name="lastName" />
        <InfoText> Email </InfoText>
        <InputLoginInfo onChange={inputOnChange} value={newUserData.email} placeholder="example@com.by" name="email" />
        <InfoText> Password </InfoText>
        <InputLoginInfo
          type="password"
          onChange={inputOnChange}
          value={newUserData.password}
          placeholder="minimum 5 symbols"
          name="password"
        />
        {isTrueErrorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </ContentContainer>
      <ButtonContainer onClick={onClickContent}>
        <ButtonAction onClick={closeModalLogin}> Cancel</ButtonAction>
        <ButtonLogin onClick={loginNewUser} isTrueData={isTrueData}>
          Login
        </ButtonLogin>
      </ButtonContainer>
    </>
  );
};
