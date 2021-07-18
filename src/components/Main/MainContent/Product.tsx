import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { ACTIONS_APP, IStore } from '../../../redux/constants';
import { useEffect } from 'react';
import { IProducts } from '../../../utils/interfaces';
import { ModalProductView } from '../../Modal';

const CardContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 20px 10px 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const Category = styled.span`
  color: #757575;
  cursor: pointer;
  transition: all 0.5s ease;
  border-radius: 10px;
  padding: 7px;
  &:hover {
    color: #ffffff;
    background-color: #8d33da;
  }
`;

const Title = styled.p`
  color: #757575;
  width: 221px;
  height: 75px;
  align-items: center;
  margin-bottom: 10px;
`;

const ImgContainer = styled.div`
  width: 200px;
  min-height: 310px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 270px;
  cursor: pointer;
`;

const ContainerBuying = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const Price = styled.p`
  color: #757575;
  font-size: 20px;
`;

interface IMainCard {
  product: IProducts;
}

export const Product: React.FC<IMainCard> = ({ product }): JSX.Element => {
  const dispatch = useDispatch();
  const [isOpenModalProductView, setIsOpenModalProductView] = useState(false);
  const [isIdInBasket, setIsIdInBasker] = useState(false);
  const listProductInBasket = useSelector((store: IStore) => store.appReducer.productsInBasket);

  useEffect(() => {
    const isProductInBasket = listProductInBasket.some((elem) => elem.id === product.id);
    setIsIdInBasker(isProductInBasket);
  }, [listProductInBasket, product.id]);

  const addProductToBasket = (): void => {
    dispatch({
      type: ACTIONS_APP.ADD_PRODUCT,
      addSelectedProduct: product,
    });
    setIsIdInBasker(true);
  };

  const openModalProductView = (): void => {
    setIsOpenModalProductView(true);
  };

  const removeProductFromBasker = (): void => {
    dispatch({
      type: ACTIONS_APP.DELETE_PRODUCT,
      deleteSelectedProduct: product.id,
    });
    setIsIdInBasker(false);
  };

  const closeModalView = (): void => {
    setIsOpenModalProductView(false);
  };

  return (
    <>
      {isOpenModalProductView && (
        <ModalProductView
          closeModalView={closeModalView}
          imgSrc={product.image}
          title={product.title}
          description={product.description}
        />
      )}
      <CardContainer>
        <ImgContainer>
          <Img src={product.image} onClick={openModalProductView} />
        </ImgContainer>
        <Title>{product.title}</Title>
        <CategoryContainer>
          Category: <Category>{product.category}</Category>
        </CategoryContainer>
        <ContainerBuying>
          <Price>${product.price}</Price>
          <FontAwesomeIcon
            icon={faMinusSquare}
            className={isIdInBasket ? 'faCartMinus' : 'faCartMinusInBasket'}
            onClick={removeProductFromBasker}
          />
          <FontAwesomeIcon
            icon={faCartPlus}
            className={!isIdInBasket ? 'faShoppingTruck' : 'faShoppingTruckInBasket'}
            onClick={addProductToBasket}
          />
        </ContainerBuying>
      </CardContainer>
    </>
  );
};
