import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_ADMIN_DATA, IStore } from '../../redux/constants';
import { INewAccAdmin } from '../../utils/interfaces';

const AdminPanelContent = styled.section`
  width: 100%;
  margin: 50px auto;
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderAdminPanel = styled.h1`
  padding: 30px 0;
`;

const Button = styled.button`
  height: 50px;
  font-size: 18px;
  padding: 5px 15px;
  margin-bottom: 30px;
`;
const ChangeDataContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;

const Text = styled.p`
  font-size: 20px;
  width: 100px;
  margin-right: 25px;
`;

const Input = styled.input`
  width: 150px;
  height: 26px;
  padding-left: 15px;
  font-size: 17px;
`;

interface IButtonSave {
  isCheckedAllData: boolean;
}

const ButtonSave = styled.button<IButtonSave>`
  font-size: 18px;
  padding: 5px 15px;
  margin-top: 30px;
  ${(props) => (props.isCheckedAllData ? '' : 'opacity: 0.5; pointer-events: none')}
`;

interface IChangedAccointAdminInfo {
  isChangedSaves: boolean;
}

const ChangedAccountAdminInfo = styled.p<IChangedAccointAdminInfo>`
  font-size: 20px;
  margin: 20px 0 0;
  ${({ isChangedSaves }): string => (isChangedSaves ? 'color: green' : 'color: red')}
`;

export const AdminPanel = (): JSX.Element => {
  const [isChangeLoginData, setIsChangeLoginData] = useState(false);
  const [isCheckedAllData, setSsCheckedAllData] = useState(false);
  const [isServerResponse, setIsServerResponse] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordOnceMore, setNewPasswordOnceMore] = useState('');
  const dispatch = useDispatch();
  const changeAccDataInfo = useSelector((store: IStore) => store.adminReducer.changeAccAdminInfo);
  const errorChangeAccData = useSelector((store: IStore) => store.adminReducer.error);

  const handleChangePassword = (): void => {
    setIsChangeLoginData(!isChangeLoginData);
  };

  const setStateOldPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOldPassword(event.target.value);
  };

  const setStateNewLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewLogin(event.target.value);
  };

  const setStateNewPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(event.target.value);
  };
  const setStateNewPasswordOnceMore = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPasswordOnceMore(event.target.value);
  };

  useEffect(() => {
    setIsServerResponse(false);
    setIsChangeLoginData(false);
    const error = '';
    dispatch({ type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_FAILURE, error });
    const changeAccAdminInfo = '';
    dispatch({ type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_SUCCESS, changeAccAdminInfo });
  }, []);

  useEffect(() => {
    if (
      oldPassword.length >= 5 &&
      newLogin.length >= 5 &&
      newPassword.length >= 5 &&
      newPasswordOnceMore.length >= 5 &&
      newPassword === newPasswordOnceMore
    ) {
      setSsCheckedAllData(true);
    }
  }, [oldPassword, newLogin, newPassword, newPasswordOnceMore]);

  const requestChangePassword = (): void => {
    const error = '';
    dispatch({ type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_FAILURE, error });
    const changeAccAdminInfo = '';
    dispatch({ type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_SUCCESS, changeAccAdminInfo });
    const newAccAdmin = { oldPassword, newLogin, newPassword } as INewAccAdmin;

    dispatch({ type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA, newAccAdmin });
  };

  useEffect(() => {
    if (changeAccDataInfo) {
      setIsServerResponse(true);
      setOldPassword('');
      setNewLogin('');
      setNewPassword('');
      setNewPasswordOnceMore('');
    }
  }, [changeAccDataInfo]);

  useEffect(() => {
    if (errorChangeAccData) {
      setIsServerResponse(true);
    }
  }, [errorChangeAccData]);

  return (
    <>
      <AdminPanelContent>
        <HeaderAdminPanel>You are on Admin page!</HeaderAdminPanel>
        <Button onClick={handleChangePassword}>Change login data</Button>
        {isChangeLoginData && (
          <>
            <ChangeDataContainer>
              <Text>Old Password </Text>
              <Input onChange={setStateOldPassword} value={oldPassword} type="password" />
            </ChangeDataContainer>
            <ChangeDataContainer>
              <Text>New Login </Text>
              <Input onChange={setStateNewLogin} value={newLogin} />
            </ChangeDataContainer>
            <ChangeDataContainer>
              <Text>New Password </Text>
              <Input onChange={setStateNewPassword} value={newPassword} type="password" />
            </ChangeDataContainer>
            <ChangeDataContainer>
              <Text>Once New Password </Text>
              <Input onChange={setStateNewPasswordOnceMore} value={newPasswordOnceMore} type="password" />
            </ChangeDataContainer>
            <ButtonSave isCheckedAllData={isCheckedAllData} onClick={requestChangePassword}>
              Save Changes
            </ButtonSave>
          </>
        )}
        {isServerResponse && (
          <ChangedAccountAdminInfo isChangedSaves={errorChangeAccData.length === 0}>
            {changeAccDataInfo ? changeAccDataInfo : errorChangeAccData}
          </ChangedAccountAdminInfo>
        )}
      </AdminPanelContent>
    </>
  );
};
