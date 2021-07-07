import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ACTIONS_APP } from '../../../redux/constants';
import { mainColor } from '../../../utils/colors';

const CategoriesSideMenu = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease-out;
  align-items: center;
  margin: 20px 0;
  padding: 20px 50px;
  text-align: center;
  &:hover {
    background: linear-gradient(90deg, rgba(141, 51, 218, 1) 0%, rgba(53, 0, 212, 1) 100%);
    color: #ffffff;
  }
`;

const SelectedCategorySideMenu = styled(CategoriesSideMenu)`
  background: linear-gradient(90deg, rgba(141, 51, 218, 1) 0%, rgba(53, 0, 212, 1) 100%);
  color: #ffffff;
`;

const CategoriesHeader = styled.div`
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

const SelectedCategoryHeader = styled(CategoriesHeader)`
  background-color: ${mainColor};
  color: #ffffff;
  box-shadow: 0px 3px 10px 5px rgba(255, 255, 255, 0.3);
`;

interface ICategory {
  catName: string;
  selectCategory: string;
  isHeader: boolean;
}

export const Category: React.FC<ICategory> = ({ catName, selectCategory, isHeader }) => {
  const [isCurrentCategory, setIsCurrentCategory] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    selectCategory === catName ? setIsCurrentCategory(true) : setIsCurrentCategory(false);
  }, [selectCategory, catName]);

  const goToCategory = (): void => {
    const currentCategory = catName;
    dispatch({
      type: ACTIONS_APP.CURRENT_CATEGORY,
      currentCategory,
    });
    history.push(`/category/${catName}`);
  };

  const returnCategoriesSideMenu = (): JSX.Element =>
    !isCurrentCategory ? (
      <CategoriesSideMenu onClick={goToCategory}>{catName}</CategoriesSideMenu>
    ) : (
      <SelectedCategorySideMenu onClick={goToCategory}>{catName}</SelectedCategorySideMenu>
    );

  const returnCategoriesHeaderMenu = (): JSX.Element =>
    !isCurrentCategory ? (
      <CategoriesHeader onClick={goToCategory}>{catName}</CategoriesHeader>
    ) : (
      <SelectedCategoryHeader onClick={goToCategory}>{catName}</SelectedCategoryHeader>
    );

  return <>{isHeader ? returnCategoriesHeaderMenu() : returnCategoriesSideMenu()}</>;
};
