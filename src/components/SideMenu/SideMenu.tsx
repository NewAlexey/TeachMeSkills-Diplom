import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, useState } from 'react';
import { useEffect } from 'react';

import { Category } from '../Header/HeaderUser/Category';
import getID from '../../utils/get-random-id';
import { mainColor } from '../../utils/colors';
import { ACTIONS_APP, IStore } from '../../redux/constants';

interface ISideMenuContainer {
  isFreezeSideMenu: boolean;
  scroll: boolean;
}

const SideMenuContainer = styled.nav<ISideMenuContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 175px;
  height: 100%;
  position: fixed;
  ${({ scroll }): string => (scroll ? 'left: -150px;' : 'left: -200px;')}
  top: 0px;
  background-color: ${mainColor};
  border-radius: 0 25px 25px 0;
  box-shadow: 0px 3px 10px 5px rgba(141, 51, 218, 0.3);
  transition: all 0.8s ease;
  ${({ isFreezeSideMenu }): string =>
    !isFreezeSideMenu
      ? `
  &:hover {
    left: 0px;
    border-radius: 0 100px 100px 0;
    box-shadow: 5px 0px 25px 5px #535252;
  }`
      : 'left: 0px;'}
`;

const LockContainer = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  left: 20px;
  top: 10px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const faLockStyle = {
  transition: 'color 0.5s ease-in-out',
  fontSize: '20px',
  color: 'black',
  cursor: 'pointer',
} as CSSProperties;

export const SideMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const categories = useSelector((store: IStore) => store.categoriesReducer.categories);
  const isFreezeSideMenu = useSelector((store: IStore) => store.appReducer.isFreezeSideMenu);
  const currentCategory = useSelector((store: IStore) => store.appReducer.currentCategory);
  const isAdminLogin = useSelector((store: IStore) => store.loginReducer.isAdminLogin);

  useEffect(() => {
    const handleScroll = (): void => {
      if (isFreezeSideMenu) {
        return;
      } else {
        setScroll(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.addEventListener('scroll', handleScroll);
  }, [isFreezeSideMenu]);

  const freezeSideMenu = (): void => {
    dispatch({ type: ACTIONS_APP.FREEZE_SIDE_MENU });
  };

  return (
    <>
      {!isAdminLogin && (
        <SideMenuContainer isFreezeSideMenu={isFreezeSideMenu} scroll={scroll > 100}>
          <LockContainer onClick={freezeSideMenu}>
            {isFreezeSideMenu ? (
              <FontAwesomeIcon icon={faLock} style={faLockStyle} />
            ) : (
              <FontAwesomeIcon icon={faLockOpen} style={faLockStyle} />
            )}
          </LockContainer>
          <CategoriesContainer>
            {categories.map((elem) => {
              return <Category key={getID()} catName={elem} selectCategory={currentCategory} isHeader={false} />;
            })}
          </CategoriesContainer>
        </SideMenuContainer>
      )}
    </>
  );
};
