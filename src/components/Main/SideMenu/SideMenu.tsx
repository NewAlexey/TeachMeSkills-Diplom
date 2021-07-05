import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { Category } from './Categories';
import getID from '../../../utils/get-random-id';
import { mainColor } from '../../../utils/colors';
import { ACTIONS_APP, IStore } from '../../../redux/constants';

interface ISideMenuContainer {
  isFreezeSideMenu: boolean;
}

const SideMenuContainer = styled.nav<ISideMenuContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10%;
  height: 100%;
  position: fixed;
  left: -150px;
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
    border-radius: 0 150px 150px 0;
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

export const SideMenu = (): JSX.Element => {
  const refSideMenu = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const categories = useSelector((store: IStore) => store.categoriesReducer.categories);
  const isFreezeSideMenu = useSelector((store: IStore) => store.appReducer.isFreezeSideMenu);

  const freezeSideMenu = (): void => {
    dispatch({ type: ACTIONS_APP.FREEZE_SIDE_MENU });
  };


  return (
    <>
      <SideMenuContainer ref={refSideMenu} isFreezeSideMenu={isFreezeSideMenu}>
        <LockContainer onClick={freezeSideMenu}>
          {isFreezeSideMenu ? (
            <FontAwesomeIcon icon={faLock} className="faLock" />
          ) : (
            <FontAwesomeIcon icon={faLockOpen} className="faLock" />
          )}
        </LockContainer>
        <CategoriesContainer>
          {categories.map((elem) => {
            return <Category key={getID()} catName={elem} />;
          })}
        </CategoriesContainer>
      </SideMenuContainer>
    </>
  );
};
