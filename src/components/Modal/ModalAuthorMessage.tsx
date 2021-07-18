import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS_APP, IStore } from '../../redux/constants';

import { mainColor } from '../../utils/colors';

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
  padding-bottom: 50px;
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

const TextArea = styled.textarea`
  height: 160px;
  width: 230px;
  margin-top: 10px;
  padding: 15px;
  font-size: 15px;
  resize: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 25px;
`;

const onClickContent = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.stopPropagation();
};

interface IModalProps {
  closeModalAuthorMessage(): void;
}

export const ModalAuthorMessage: React.FC<IModalProps> = ({ closeModalAuthorMessage }) => {
  const errorMessage = useSelector((store: IStore) => store.appReducer.error);
  const information = useSelector((store: IStore) => store.appReducer.information);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const writeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  const sendMessageToAuthor = (): void => {
    dispatch({ type: ACTIONS_APP.SEND_MESSAGE_TO_AUTHOR, sendMessageAuthor: message });
  };

  useEffect(() => {
    if (information) {
      alert(`${information}`);
      closeModalAuthorMessage();
    }
  }, [information]);

  useEffect(() => {
    return (): void => {
      dispatch({ type: ACTIONS_APP.SEND_INFO_TG_FAILURE, orderError: '' });
      dispatch({ type: ACTIONS_APP.SEND_MESSAGE_TO_AUTHOR_SUCCESS, information: '' });
    };
  }, [dispatch]);

  return (
    <>
      <Background onClick={closeModalAuthorMessage}>
        <ContentContainer onClick={onClickContent}>
          <Information>Do you want send me a message?</Information>
          <TextArea value={message} onChange={writeMessage} />
          {errorMessage && <ErrorMessage></ErrorMessage>}
        </ContentContainer>
        <ButtonContainer onClick={onClickContent}>
          <ButtonAction onClick={closeModalAuthorMessage}> Cancel</ButtonAction>
          <ButtonAction onClick={sendMessageToAuthor}>Send</ButtonAction>
        </ButtonContainer>
      </Background>
    </>
  );
};
