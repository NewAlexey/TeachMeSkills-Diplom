import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ACTIONS_ADMIN_DATA, IStore } from '../../../redux/constants';
import { mainColor } from '../../../utils/colors';
import { IExistUserData } from '../../../utils/interfaces';
import { Spinner } from '../../Spinner';

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

const TableContainer = styled.div`
  max-width: 100%;
  width: 850px;
  margin: 0 auto 30px auto;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead`
  height: 50px;
  background-color: ${mainColor};
`;

const Th = styled.th`
  padding: 0 10px;
  border: 1px solid #a9a99d;
  min-width: 40px;
  cursor: pointer;
`;

const ThNumber = styled(Th)`
  cursor: default;
`;

const Tr = styled.tr`
  &:nth-child(2n) {
    background-color: #a9a99d;
  }
  cursor: default;
`;

const TrData = styled(Tr)`
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
  }
`;

const Td = styled.td`
  text-align: center;
  border: 1px solid #79792b;
  padding: 4px 1em;
  text-transform: capitalize;
`;

const UsersSearch = styled.input`
  padding-left: 15px;
  font-size: 20px;
  margin-bottom: 30px;
`;

const sortData = (arr: any, value: string, sortDirection: boolean): any => {
  return [...arr].sort((a, b) => {
    if (sortDirection) {
      return a[value] < b[value] ? -1 : 1;
    }
    return a[value] < b[value] ? 1 : -1;
  });
};

export const Users = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const usersList = useSelector((store: IStore) => store.adminReducer.usersList);
  const [searchedUser, setSearchedUser] = useState('');

  const [sortedUserList, setSortedUserList] = useState<IExistUserData[]>([]);
  const [sortDirection, setSortDirection] = useState(false);

  const sortBy = (value: string): void => {
    const sortedList = sortData(sortedUserList, value, !sortDirection);
    setSortedUserList(sortedList);
    setSortDirection(!sortDirection);
  };

  const searchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchInputValue = event.target.value;
    setSearchedUser(searchInputValue);
  };

  useEffect(() => {
    if (!searchedUser) {
      setSortedUserList([...usersList]);
    } else {
      const newUsersList = sortedUserList.filter((user) => {
        if (
          user.email.includes(searchedUser) ||
          user.firstName.includes(searchedUser) ||
          user.lastName.includes(searchedUser)
        )
          return true;
        else {
          return false;
        }
      });
      setSortedUserList(newUsersList);
    }
  }, [searchedUser]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ACTIONS_ADMIN_DATA.GET_USERS_ADMIN });
    }, 1500);
    return (): void => {
      dispatch({ type: ACTIONS_ADMIN_DATA.GET_USERS_SUCCESS_ADMIN, usersList: [] });
    };
  }, [dispatch]);

  useEffect(() => {
    setSortedUserList(usersList);
  }, [usersList]);

  const goToUser = (userEmail: string): void => {
    history.push(`/admin-panel/users/${userEmail}`);
  };

  return (
    <>
      <UsersContainer>
        <HeaderUsers>Users Page</HeaderUsers>
        <UsersSearch value={searchedUser} onChange={searchUser} />
        {usersList.length === 0 ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <ThNumber>№</ThNumber>
                  <Th onClick={(): void => sortBy('id')}>Id</Th>
                  <Th onClick={(): void => sortBy('email')}>Email</Th>
                  <Th onClick={(): void => sortBy('firstName')}>First Name</Th>
                  <Th onClick={(): void => sortBy('lastName')}>Last Name</Th>
                </Tr>
              </Thead>
              <tbody>
                {sortedUserList.length !== 0 &&
                  sortedUserList.map((user, index) => {
                    return (
                      <TrData key={user.id} onClick={() => goToUser(`${user.email}`)}>
                        <Td>{index + 1}</Td>
                        <Td>{user.id}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.firstName}</Td>
                        <Td>{user.lastName}</Td>
                      </TrData>
                    );
                  })}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </UsersContainer>
    </>
  );
};
