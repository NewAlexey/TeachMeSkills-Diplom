import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ACTIONS_APP, IStore } from '../../redux/constants';
import { mainColor } from '../../utils/colors';
import getID from '../../utils/get-random-id';
import { OrderItem } from './OrderItem';

const OrderContainer = styled.section`
  min-height: calc(100vh - 150px);
  margin: 100px auto 70px;
  width: 80%;
  text-align: center;
`;

const OrdersHeader = styled.h1`
  color: ${mainColor};
  font-size: 30px;
`;

const EmptyOrderText = styled.h1`
  font-size: 30px;
  color: ${mainColor};
`;

export const UserOrder = (): JSX.Element => {
  const userEmail = useSelector((store: IStore) => store.loginReducer.userEmail);
  const userOrders = useSelector((store: IStore) => store.appReducer.userOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS_APP.GET_USER_ORDERS, userEmail });
  }, [dispatch, userEmail]);

  return (
    <OrderContainer>
      <OrdersHeader>Order's List</OrdersHeader>
      {userOrders.length > 0 ? (
        userOrders.map((order) => {
          return <OrderItem key={getID()} orderItem={order} />;
        })
      ) : (
        <EmptyOrderText>You don't have any order</EmptyOrderText>
      )}
    </OrderContainer>
  );
};
