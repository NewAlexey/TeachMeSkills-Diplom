import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IStore } from '../../redux/constants';
import getID from '../../utils/get-random-id';
import { Category } from './Categories';

const HeaderContaier = styled.header`
  width: 80%;
  height: 50px;
  position: absolute;
  top: 0px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 90px;
  display: flex;

  border-radius: 0 0 50px 50px;
  color: #a8a8a8;
`;

export const Header = (): JSX.Element => {
  const categories = useSelector((store: IStore) => store.categoriesReducer.categories);
  return (
    <>
      <HeaderContaier>
        <HeaderContent>
          {categories.map((elem) => {
            return <Category key={getID()} catName={elem} />;
          })}
        </HeaderContent>
      </HeaderContaier>
    </>
  );
};
