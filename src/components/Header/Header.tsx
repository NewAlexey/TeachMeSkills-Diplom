import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IStore } from '../../redux/constants';
import { HeaderAdmin } from './HeaderAdmin';
import { HeaderUser } from './HeaderUser';

const HeaderContaier = styled.header`
  width: 80%;
  height: 50px;
  position: absolute;
  top: 0px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const Header = (): JSX.Element => {
  const isAdminLogin = useSelector((store: IStore) => store.loginReducer.isAdminLogin);

  return (
    <>
      <HeaderContaier>{isAdminLogin ? <HeaderAdmin /> : <HeaderUser />}</HeaderContaier>
    </>
  );
};
