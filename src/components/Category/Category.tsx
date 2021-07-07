import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';

import { IStore } from '../../redux/constants';
import { IProducts } from '../../utils/interfaces';
import { Product } from '../Main/MainContent/Product';
import { mainColor } from '../../utils/colors';

const ProductsCategoryContainer = styled.section`
  position: relative;
  width: 80%;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto 100px auto;
  border-radius: 50px;
  box-shadow: 0px 0px 15px 15px #ffffff;
  justify-content: space-evenly;
`;

const SortArrowUp = {
  position: 'absolute',
  fontSize: '20px',
  color: `${mainColor}`,
  top: '10px',
  left: '13%',
  cursor: 'pointer',
} as CSSProperties;

const SortArrowDown = {
  position: 'absolute',
  fontSize: '20px',
  color: `${mainColor}`,
  top: '10px',
  left: '15%',
  cursor: 'pointer',
} as CSSProperties;

const SortText = styled.p`
  position: absolute;
  font-size: 16px;
  color: ${mainColor};
  top: 12px;
  left: 4%;
`;

interface IUseParams {
  category: string;
}

export const Category: React.FC = () => {
  const { category } = useParams<IUseParams>();
  const allProducts = useSelector((store: IStore) => store.productReducer.products);
  const [productInCategory, setProductInCategory] = useState<IProducts[]>([]);

  useEffect(() => {
    const filteredProducts = allProducts.filter((elem) => elem.category === category);
    setProductInCategory(filteredProducts);
  }, [category, allProducts]);

  return (
    <>
      <ProductsCategoryContainer>
        <SortText> Sort by price </SortText>
        <FontAwesomeIcon icon={faLongArrowAltUp} style={SortArrowUp} />
        <FontAwesomeIcon icon={faLongArrowAltDown} style={SortArrowDown} />
        {productInCategory.map((elem) => {
          return <Product key={elem.id} product={elem} />;
        })}
      </ProductsCategoryContainer>
    </>
  );
};
