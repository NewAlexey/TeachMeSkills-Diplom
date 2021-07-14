import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';
import { IProductsBasket } from '../../../utils/interfaces';
import { PriceAndCountInfo } from './PriceAndCountInfo';
import { useDispatch } from 'react-redux';
import { ACTIONS_APP } from '../../../redux/constants';

const ProductContainer = styled.div`
  width: 100%;
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
  margin: 50px;
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

const BasketStyle = {
  position: 'absolute',
  fontSize: '25px',
  color: '#8d33da',
  top: '10%',
  right: '0',
  cursor: 'pointer',
  zIndex: 10,
} as CSSProperties;

interface IProductInBasket {
  product: IProductsBasket;
}

export const ProductInBasket: React.FC<IProductInBasket> = ({ product }): JSX.Element => {
  const dispatch = useDispatch();

  const deleteProductFromBasket = (): void => {
    const deleteSelectedProduct = product.id;
    dispatch({
      type: ACTIONS_APP.DELETE_PRODUCT,
      deleteSelectedProduct,
    });
  };

  return (
    <>
      <ProductContainer>
        <FontAwesomeIcon icon={faTimes} style={BasketStyle} onClick={deleteProductFromBasket} />
        <ImgContainer>
          <ImgProduct src={product.image} />
        </ImgContainer>
        <ProductInformation>
          <Category>Category: {product.category}</Category>
          <Title>Title: {product.title}</Title>
          <p>Description</p>
          <Description>{product.description}</Description>
        </ProductInformation>
        <PriceAndCountInfo product={product}></PriceAndCountInfo>
      </ProductContainer>
    </>
  );
};
