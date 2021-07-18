import styled from 'styled-components';

import { mainColor } from '../../../utils/colors';
import { IUserOrder } from '../../../utils/interfaces';

const OrderItemContainer = styled.div`
  width: 100%;
  min-height: 150px;
  border: 1px solid grey;
  border-radius: 40px;
  display: flex;
  align-items: center;
  margin: 50px 0 0;
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

const ProductItemContainer = styled.div`
  width: 100%;
  margin: 15px 0;
  text-align: left;
  background-color: #c4c4c4;
  border-radius: 0 20px 20px 0;
`;

const Information = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 400;
  margin: 0 10px;
`;

const Count = styled(Title)`
  margin: 7px 10px;
`;

const Price = styled(Title)``;

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
          return (
            <ProductItemContainer>
              <Information>
                Product:
                <Title>{product.title}</Title>
              </Information>
              <Information>
                Price:
                <Price> ${product.price}</Price>
              </Information>
              <Information>
                Count:
                <Count> {product.count}</Count>
              </Information>
            </ProductItemContainer>
          );
        })}
      </OrderContent>
    </OrderItemContainer>
  );
};
