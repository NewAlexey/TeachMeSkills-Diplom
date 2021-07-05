import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { ACTIONS_APP, IStore } from '../../../redux/constants';
import { useEffect } from 'react';

const CardContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 50px 40px 40px;
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
  category: string;
  title: string;
  imgSrc: string;
  price: number;
  id: number;
}

export const Product: React.FC<IMainCard> = ({ category, title, imgSrc, price, id }): JSX.Element => {
  const dispatch = useDispatch();
  const [isIdInBasket, setIsIdInBasker] = useState(false);
  const listIdInBasker = useSelector((store: IStore) => store.appReducer.idProductsInBasket);

  useEffect(() => {
    const isProductInBasket = listIdInBasker.some((elem) => elem === id);
    setIsIdInBasker(isProductInBasket);
  }, [listIdInBasker]);

  const addProductToBasker = (): void => {
    const addedId = id;
    dispatch({
      type: ACTIONS_APP.ADD_PRODUCT,
      addedId,
    });
    setIsIdInBasker(true);
  };

  const removeProductFromBasker = (): void => {
    const deletedId = id;
    dispatch({
      type: ACTIONS_APP.DELETE_PRODUCT,
      deletedId,
    });
    setIsIdInBasker(false);
  };

  return (
    <>
      <CardContainer>
        <ImgContainer>
          <Img src={imgSrc} />
        </ImgContainer>
        <Title>{title}</Title>
        <CategoryContainer>
          Category: <Category>{category}</Category>
        </CategoryContainer>
        <ContainerBuying>
          <Price>${price}</Price>
          <FontAwesomeIcon
            icon={faMinusSquare}
            className={isIdInBasket ? 'faCartMinus' : 'faCartMinusInBasker'}
            onClick={removeProductFromBasker}
          />
          <FontAwesomeIcon
            icon={faCartPlus}
            className={!isIdInBasket ? 'faShoppingTruck' : 'faShoppingTruckInBasket'}
            onClick={addProductToBasker}
          />
        </ContainerBuying>
      </CardContainer>
    </>
  );
};
