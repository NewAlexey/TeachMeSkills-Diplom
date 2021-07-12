import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_LOGIN, IStore } from '../../../redux/constants';
import { store } from '../../../redux/store';

import { mainColor } from '../../../utils/colors';
import { INewUserLoginInfo } from '../../../utils/interfaces';
import { checkEmail } from '../../../utils/validate-email-order';

const ContentContainer = styled.div`
  position: relative;
  width: 20%;
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
  width: 20%;
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
  bottom: 3%;
  right: 10%;
`;

const onClickContent = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
};

interface IModalLoginExistUser {
  closeModalLogin(): void;
  changeModalType(): void;
}

export const ModalRegistrationUser: React.FC<IModalLoginExistUser> = ({ closeModalLogin, changeModalType }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTrueData, setIsTrueData] = useState(false);
  const [isTrueErrorMessage, setIsTrueErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const isUserLogin = useSelector((store: IStore) => store.loginReducer.isUserLogin);
  const errorMessage = useSelector((store: IStore) => store.loginReducer.error);

  const loginNewUser = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    const newUserInfo = { email, password, firstName, lastName } as INewUserLoginInfo;
    dispatch({ type: ACTIONS_LOGIN.APP_LOGIN_NEW_USER, newUserInfo });
  };

  useEffect(() => {
    if (isUserLogin) {
      closeModalLogin()
    }
  }, [isUserLogin]);

  useEffect(() => {
    return () => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setIsTrueData(false);
      setIsTrueErrorMessage(false);
      const error = '';
      dispatch({
        type: ACTIONS_LOGIN.APP_LOGIN_FAILURE,
        error,
      });
    };
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setIsTrueErrorMessage(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (checkEmail(email) && firstName.length >= 3 && lastName.length >= 3 && password.length >= 5) {
      setIsTrueData(true);
    }
  }, [firstName, lastName, email, password]);

  const inputFirstNameData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const inputLastNameData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const inputEmailData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const inputPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <ContentContainer onClick={onClickContent}>
        <ChangeModalType onClick={changeModalType}> Exist User </ChangeModalType>
        <Information>Sign in</Information>
        <InfoText> First Name </InfoText>
        <InputLoginInfo onChange={inputFirstNameData} value={firstName} />
        <InfoText> Second Name </InfoText>
        <InputLoginInfo onChange={inputLastNameData} value={lastName} />
        <InfoText> Email </InfoText>
        <InputLoginInfo onChange={inputEmailData} value={email} placeholder='example@com.by' />
        <InfoText> Password </InfoText>
        <InputLoginInfo type="password" onChange={inputPasswordData} value={password} placeholder='minimum 5 symbols' />
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
