import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_ADMIN_DATA, IStore } from '../../../redux/constants';

const UsersContainer = styled.section`
  min-height: calc(100vh - 150px);
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderUsers = styled.h1`
  font-size: 25px;
  padding: 30px 0;
`;

const InfoText = styled.p`
  font-size: 25px;
`;

export const Users = (): JSX.Element => {
  const dispatch = useDispatch();
  const usersList = useSelector((store: IStore) => store.adminReducer.usersList);
  console.log(usersList);

  useEffect(() => {
    dispatch({ type: ACTIONS_ADMIN_DATA.GET_USERS_ADMIN });
  }, []);

  return (
    <>
      <UsersContainer>
        <HeaderUsers>Users Page</HeaderUsers>
        {usersList.length === 0 ? <InfoText>No any users in DB</InfoText> : ''}
      </UsersContainer>
    </>
  );
};
