import styled from 'styled-components';

const ProductItemContainer = styled.div`
  width: 100%;
  margin: 15px 0;
`;

const Title = styled.p`
  font-size: 20px;
`;

const Count = styled(Title)``;

interface IProductItem {
  title: string;
  count: number;
}

export const ProductItem: React.FC<IProductItem> = ({ title, count }) => {
  return (
    <ProductItemContainer>
      <Title>Title: {title}</Title>
      <Count> Count: {count}</Count>
    </ProductItemContainer>
  );
};
