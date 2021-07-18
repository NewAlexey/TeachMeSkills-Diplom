import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IStore } from '../../../redux/constants';
import getID from '../../../utils/get-random-id';
import { IExistUserData } from '../../../utils/interfaces';
import { ModalDeleteUser } from '../../Modal/ModalDeleteUser';
import { OrderItem } from '../../UserOrders/OrderItem';

const UserContainer = styled.section`
  min-height: calc(100vh - 150px);
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserHeader = styled.h1`
  padding: 30px 0;
`;

const UserInfo = styled.p`
  font-weight: 600;
  font-size: 20px;
  padding: 5px 0;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 20px;
  padding-left: 15px;
`;

const UserOrdersInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  margin: 20px 0 0;
`;

const OrdersInfo = styled.h2`
  margin-top: 50px;
`;

interface IParams {
  userEmail: string;
}

export const CurrentUser = (): JSX.Element => {
  const usersList = useSelector((store: IStore) => store.adminReducer.usersList);
  const [currentUser, setCurrentUser] = useState<IExistUserData>();
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const params = useParams<IParams>();

  useEffect(() => {
    const findedUser = usersList.find((user) => user.email === params.userEmail);
    setCurrentUser(findedUser);
  }, []);

  const deleteUser = (): void => {
    setIsDeleteUserModalOpen(true);
  };

  const closeModalDeleteUser = (): void => {
    setIsDeleteUserModalOpen(false);
  };

  return (
    <UserContainer>
      {isDeleteUserModalOpen && (
        <ModalDeleteUser
          closeModalDeleteUser={closeModalDeleteUser}
          userEmail={params.userEmail}
          idDeletedUser={currentUser!.id}
          usersList={usersList}
        />
      )}
      <UserHeader>User Information</UserHeader>
      {currentUser && (
        <>
          <UserInfoWrapper>
            <UserInfo>
              Email: <Text>{currentUser.email}</Text>
            </UserInfo>
            <UserInfo>
              First Name: <Text>{currentUser.firstName}</Text>
            </UserInfo>
            <UserInfo>
              Last Name: <Text>{currentUser.lastName}</Text>
            </UserInfo>
            <UserInfo>
              Password: <Text>{currentUser.password}</Text>
            </UserInfo>
            <UserInfo>
              Order Count: <Text>{currentUser.orders.length}</Text>
            </UserInfo>
            <Button onClick={deleteUser}>Delete User</Button>
          </UserInfoWrapper>
          <UserOrdersInfo>
            <OrdersInfo>Orders Info</OrdersInfo>
            {currentUser.orders.map((item) => {
              return <OrderItem orderItem={item} key={getID()} />;
            })}
          </UserOrdersInfo>
        </>
      )}
    </UserContainer>
  );
};
