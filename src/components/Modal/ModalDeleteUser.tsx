import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ACTIONS_ADMIN_DATA, IStore } from '../../redux/constants';
import { mainColor } from '../../utils/colors';
import { IExistUserData } from '../../utils/interfaces';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #000000cc;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 300px;
  height: 250px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  background-color: #b0b0b0;
  justify-content: center;
  align-items: center;
  border-radius: 15px 15px 0 0;
`;

const Information = styled.p`
  font-size: 25px;
  width: 85%;
  text-align: center;
`;

const UserInformation = styled.span`
  color: ${mainColor};
`;

const ButtonContainer = styled.div`
  width: 300px;
  height: 70px;
  background-color: ${mainColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0 0 15px 15px;
`;

const ButtonAction = styled.button`
  width: 120px;
  height: 35px;
  font-size: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  position: absolute;
  color: red;
  bottom: 15px;
`;

const InformationMessage = styled(ErrorMessage)`
  color: #00ff0d;
`;

const onClickContent = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
};

interface IModalProps {
  closeModalDeleteUser(): void;
  userEmail: string;
  idDeletedUser: number;
  usersList: IExistUserData[];
}

export const ModalDeleteUser: React.FC<IModalProps> = ({
  closeModalDeleteUser,
  userEmail,
  idDeletedUser,
  usersList,
}) => {
  const errorMessage = useSelector((store: IStore) => store.adminReducer.error);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const information = useSelector((store: IStore) => store.adminReducer.information);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return (): void => {
      dispatch({ type: ACTIONS_ADMIN_DATA.DELETE_USER_SUCCESS, information: '', usersList: usersList });
      dispatch({ type: ACTIONS_ADMIN_DATA.DELETE_USER_FAILURE, error: '' });
      history.push('/admin-panel/users');
    };
  }, []);

  const deleteUser = (): void => {
    dispatch({ type: ACTIONS_ADMIN_DATA.DELETE_USER, idDeletedUser: `${idDeletedUser}` });
    setIsUserDelete(true);
  };

  return (
    <>
      <Background onClick={closeModalDeleteUser}>
        <ContentContainer onClick={onClickContent}>
          <Information>
            Are you sure? You want to delete user <UserInformation>{userEmail}</UserInformation> ?
          </Information>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {information && <InformationMessage>{information}</InformationMessage>}
        </ContentContainer>

        <ButtonContainer onClick={onClickContent}>
          <ButtonAction onClick={closeModalDeleteUser}> Cancel</ButtonAction>
          <ButtonAction onClick={deleteUser} disabled={isUserDelete}>
            {' '}
            Delete
          </ButtonAction>
        </ButtonContainer>
      </Background>
    </>
  );
};
