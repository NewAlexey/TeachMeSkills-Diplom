import { useState } from 'react';
import styled from 'styled-components';

import { ModalLoginUser } from './ModalLoginUsers';
import { ModalRegistrationUser } from './ModalLoginUsers';

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

interface IModalProps {
  closeModalLogin(): void;
}

export const ModalLogin: React.FC<IModalProps> = ({ closeModalLogin }) => {
  const [newUser, setNewUser] = useState(false);

  const changeModalType = (): void => {
    setNewUser(!newUser);
  };

  return (
    <>
      <Background onClick={closeModalLogin}>
        {!newUser ? (
          <ModalLoginUser closeModalLogin={closeModalLogin} changeModalType={changeModalType} />
        ) : (
          <ModalRegistrationUser closeModalLogin={closeModalLogin} changeModalType={changeModalType} />
        )}
      </Background>
    </>
  );
};
