import styled from 'styled-components';
import { IProducts } from '../../../../utils/interfaces';

const ProductContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  background: linear-gradient(90deg, #ffffff 20%, rgba(215, 215, 215, 1) 100%);
  box-shadow: 0px 0px 15px 15px #d7d7d7 inset;
  margin: 10px 0;
  border-radius: 30px 0 0 30px;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 200px;
  min-height: 310px;
  margin: 10px 0 10px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

const ImgProduct = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 200px;
`;

const ProductInformation = styled.div`
  width: 600px;
  margin: 30px;
`;

const Category = styled.p`
  padding-top: 20px;
`;

const Title = styled.p`
  padding: 20px 0;
`;

const Description = styled.p`
  padding: 10px 0;
`;

const Price = styled.p`
  padding: 10px 0;
  font-size: 20px;
`;

interface IProductsList {
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
}

export const ProductsList: React.FC<IProductsList> = ({ title, category, image, description, price }) => {
  return (
    <>
      <ProductContainer>
        <ImgContainer>
          <ImgProduct src={image} />
        </ImgContainer>
        <ProductInformation>
          <Category>Category: {category}</Category>
          <Title>Title: {title}</Title>
          <p>Description</p>
          <Description>{description}</Description>
          <Price>Price: {price} </Price>
        </ProductInformation>
      </ProductContainer>
    </>
  );
};
