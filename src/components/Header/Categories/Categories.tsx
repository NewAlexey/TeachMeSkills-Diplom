import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { mainColor } from '../../../utils/colors';

const Categories = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease-out;
  border-radius: 0 0 50px 50px;
  text-align: center;
  color: ${mainColor};
  box-shadow: 0px 3px 10px 5px rgba(53, 0, 212, 0.3);
  &:hover {
    background-color: ${mainColor};
    color: #ffffff;
    box-shadow: 0px 3px 10px 5px rgba(255, 255, 255, 0.3);
  }
`;

interface ICategory {
  catName: string;
}

export const Category: React.FC<ICategory> = ({ catName }) => {
  const history = useHistory();
  const goToCategory = (): void => {
    history.push(`/category/${catName}`);
  };

  return (
    <>
      <Categories onClick={goToCategory}>{catName}</Categories>
    </>
  );
};
