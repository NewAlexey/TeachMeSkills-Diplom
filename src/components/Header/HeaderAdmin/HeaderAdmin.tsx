import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import './style.scss';
import { mainColor } from '../../../utils/colors';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { ACTIONS_LOGIN, IStore } from '../../../redux/constants';

const LoginContainer = styled.div`
  width: 200px;
  height: 35px;
  border-left: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
  border-right: 1px solid ${mainColor};
  border-radius: 0 0 20px 25px;
  position: absolute;
  font-size: 19px;
  right: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  cursor: default;
`;

const LogoutContainer = styled.div`
  width: 75px;
  height: 25px;
  border-left: 1px solid ${mainColor};
  border-bottom: 1px solid ${mainColor};
  border-right: 1px solid ${mainColor};
  border-radius: 0 0 20px 25px;
  position: absolute;
  font-size: 15px;
  right: -6%;
  top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #000;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${mainColor};
    color: #fff;
  }
`;

const Ul = styled.ul`
  width: 60%;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
`;

const Li = styled.li`
  width: 33%;
`;

const CustomNavLink = styled(NavLink)`
  font-size: 25px;
  height: 50px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 25px 25px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${mainColor};
    color: white;
  }
`;

export const HeaderAdmin = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAdminLogin = useSelector((store: IStore) => store.loginReducer.isAdminLogin);

  useEffect(() => {
    if (isAdminLogin) {
      history.push('/admin-panel');
    }
  }, [history, isAdminLogin]);

  const logoutAdmin = (): void => {
    dispatch({ type: ACTIONS_LOGIN.APP_LOGOUT_ADMIN });
    history.push('/main');
  };

  return (
    <>
      <Ul>
        <Li>
          <CustomNavLink exact to="/admin-panel" activeClassName="active-class-li">
            Admin Panel
          </CustomNavLink>
        </Li>
        <Li>
          <CustomNavLink exact to="/admin-panel/products" activeClassName="active-class-li">
            Products
          </CustomNavLink>
        </Li>
        <Li>
          <CustomNavLink exact to="/admin-panel/users" activeClassName="active-class-li">
            Users
          </CustomNavLink>
        </Li>
        <LoginContainer>admin</LoginContainer>
        <LogoutContainer onClick={logoutAdmin}>Logout</LogoutContainer>
      </Ul>
    </>
  );
};
