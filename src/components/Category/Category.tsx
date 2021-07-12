import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IStore } from '../../redux/constants';
import { IProducts } from '../../utils/interfaces';
import { Product } from '../Main/MainContent/Product';

const ProductsCategoryContainer = styled.section`
  position: relative;
  width: 80%;
  min-height: calc(100vh - 250px);
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto 100px auto;
  border-radius: 50px;
  box-shadow: 0px 0px 15px 15px #ffffff;
  justify-content: space-evenly;
  align-items: center;
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
        {productInCategory.map((elem) => {
          return <Product key={elem.id} product={elem} />;
        })}
      </ProductsCategoryContainer>
    </>
  );
};
