import styled from 'styled-components';
import { mainColor } from '../../../utils/colors';
import { IUserOrder } from '../../../utils/interfaces';
import { ProductItem } from './ProductItem';

const OrderItemContainer = styled.div`
  width: 100%;
  min-height: 150px;
  border: 1px solid grey;
  border-radius: 40px;
  display: flex;
  align-items: center;
  margin: 50px 0;
`;

const InfoContainer = styled.div`
  width: 25%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Text = styled.p`
  font-size: 20px;
  color: #000000;
`;

const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  min-height: 150px;
`;

const OrderHeader = styled.h2`
  color: ${mainColor};
`;

interface IOrderItem {
  orderItem: IUserOrder;
}

export const OrderItem: React.FC<IOrderItem> = ({ orderItem }): JSX.Element => {
  return (
    <OrderItemContainer>
      <InfoContainer>
        <Text>Order date: {orderItem.date}</Text>
        <Text>Order total money: {orderItem.totalMoney}</Text>
      </InfoContainer>
      <OrderContent>
        <OrderHeader>Order Products</OrderHeader>
        {orderItem.order.map((product) => {
          return <ProductItem key={product.id} title={product.title} count={product.count} />;
        })}
      </OrderContent>
    </OrderItemContainer>
  );
};
