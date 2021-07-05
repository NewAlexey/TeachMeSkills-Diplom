import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';

import { IStore } from '../../redux/constants';
import { IProducts } from '../../utils/interfaces';
import { Product } from '../Main/MainContent/Product';

const ProductsCategoryContainer = styled.section`
  width: 80%;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto 100px auto;
  border-radius: 50px;
  box-shadow: 0px 0px 15px 15px #ffffff;
`;

const HomeStyle = {
  position: 'fixed',
  fontSize: '40px',
  color: '#8d33da',
  top: '1%',
  left: '11%',
  cursor: 'pointer',
} as CSSProperties;

interface IUseParams {
  category: string;
}

export const Category: React.FC = () => {
  const { category } = useParams<IUseParams>();
  const history = useHistory();
  const allProducts = useSelector((store: IStore) => store.productReducer.products);
  const [productInCategory, setProductInCategory] = useState<IProducts[]>([]);

  useEffect(() => {
    const filteredProducts = allProducts.filter((elem) => elem.category === category);
    setProductInCategory(filteredProducts);
  }, [category]);

  const goMainPage = (): void => {
    history.push('/main');
  };

  return (
    <>
      <ProductsCategoryContainer>
        <FontAwesomeIcon icon={faHome} style={HomeStyle} onClick={goMainPage} />
        {productInCategory.map((elem) => {
          return (
            <Product
              key={elem.id}
              category={elem.category}
              title={elem.title}
              imgSrc={elem.image}
              price={elem.price}
              id={elem.id}
            />
          );
        })}
      </ProductsCategoryContainer>
    </>
  );
};
