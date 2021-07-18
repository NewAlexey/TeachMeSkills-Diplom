import { useState } from 'react';
import styled from 'styled-components';

import { mainColor } from '../../utils/colors';
import { ModalAuthorMessage } from '../Modal/ModalAuthorMessage';

const FooterContaier = styled.footer`
  width: 100%;
  height: 50px;
  bottom: 0px;
  margin: 0 auto;
  box-shadow: 0px 3px 10px 5px #535252;
  border-radius: 50px 50px 0 0;
  color: #a8a8a8;
  background-color: ${mainColor};
  z-index: 5;
  position: relative;
`;

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const LogoGithubLink = styled.img`
  width: 30px;
  height: 30px;
`;

const LogoTeachMeSkills = styled.img`
  width: 200px;
  height: 30px;
`;

const Text = styled.p`
  color: #ffffff;
`;

const Link = styled.a`
  text-decoration: none;
  transition: all 0.5s ease;
  &:hover {
    transform: rotate(-5deg);
  }
`;

const WriteContainer = styled.div`
  width: 100px;
  height: 30px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 150px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.2);
    color: yellow;
  }
`;

export const Footer = (): JSX.Element => {
  const [isOpenAuthorMessageModal, setIsOpenAuthorMessageModal] = useState(false);

  const openAuthorModalMessage = (): void => {
    setIsOpenAuthorMessageModal(true);
  };

  const closeAuthorModalMessage = (): void => {
    setIsOpenAuthorMessageModal(false);
  };

  return (
    <>
      {' '}
      {isOpenAuthorMessageModal && <ModalAuthorMessage closeModalAuthorMessage={closeAuthorModalMessage} />}
      <FooterContaier>
        <ContentContainer>
          <Link href="https://linkedin.com/in/alexey-krupenia" target="_blank">
            <Text> Alexey Krupenia</Text>
          </Link>
          <Link href="https://github.com/NewAlexey" target="_blank">
            <LogoGithubLink src="./img/logo-github.svg" />
          </Link>
          <Link href="https://teachmeskills.by/" target="_blank">
            <LogoTeachMeSkills src="./img/logo-teach-me-skills.svg" />
          </Link>
          <WriteContainer onClick={openAuthorModalMessage}>Write me!</WriteContainer>
        </ContentContainer>
      </FooterContaier>
    </>
  );
};
