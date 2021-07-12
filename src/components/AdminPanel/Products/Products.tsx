import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ACTIONS_ADMIN_DATA, IStore } from '../../../redux/constants';
import { IProducts } from '../../../utils/interfaces';
import { ProductsList } from './ProductsList';

const ProductsContainer = styled.section`
  min-height: calc(100vh - 150px);
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderProducts = styled.h1`
  font-size: 25px;
  padding: 30px 0;
`;

const NameSearch = styled.p`
  font-size: 20px;
`;

const Search = styled.input`
  width: 150px;
  height: 30px;
  padding-left: 15px;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Products = (): JSX.Element => {
  const dispatch = useDispatch();
  const productsList = useSelector((store: IStore) => store.adminReducer.productsList);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [inputFindProduct, setInputFindProduct] = useState('');

  useEffect(() => {
    dispatch({ type: ACTIONS_ADMIN_DATA.GET_PRODUCTS_ADMIN });
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);

  useEffect(() => {
    if (!inputFindProduct) {
      setProducts([...productsList]);
    } else {
      const newProducts = productsList.filter((elem) => elem.title.includes(inputFindProduct));
      setProducts(newProducts);
    }
  }, [inputFindProduct]);

  const findProduct = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputFindProduct(event.target.value);
  };

  return (
    <>
      <ProductsContainer>
        <HeaderProducts>Products Page</HeaderProducts>
        <NameSearch>Search by Title</NameSearch>
        <Search onChange={findProduct} value={inputFindProduct} />
        <ProductListContainer>
          {products.map((product) => {
            return (
              <ProductsList
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                description={product.description}
                category={product.category}
              />
            );
          })}
        </ProductListContainer>
      </ProductsContainer>
    </>
  );
};
