import styled from "styled-components";

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
  z-index: 150;
`;

const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  max-width: 35%;
  height: fit-content;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Img = styled.img`
  width: 50%;
`;

const TitleProduct = styled.p`
  font-size: 25px;
  width: 100%;
  padding: 0 0 30px;
`;

const Description = styled.p`
  width: 100%;
  padding: 20px 0 0;
`;

interface IModalProductView {
  closeModalView(): void;
  imgSrc: string;
  title: string;
  description: string;
}

export const ModalProductView: React.FC<IModalProductView> = ({
  closeModalView,
  imgSrc,
  title,
  description,
}) => {
  const closeModal = (): void => {
    closeModalView();
  };

  return (
    <Background onClick={closeModal}>
      <Container onClick={(event) => event.stopPropagation()}>
        <TitleProduct>{title}</TitleProduct>
        <Img src={imgSrc} />
        <Description>{description}</Description>
      </Container>
    </Background>
  );
};
