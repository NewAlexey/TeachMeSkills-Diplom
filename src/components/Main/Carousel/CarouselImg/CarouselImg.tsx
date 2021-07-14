import styled from 'styled-components';

const ImgShop = styled.img`
  width: 800px;
  margin: 0 10px;
`;

interface ICarouselImg {
  imgUrl: string;
}

export const CarouselImg: React.FC<ICarouselImg> = ({ imgUrl }) => {
  return (
    <>
      <ImgShop src={imgUrl} alt="img-shop" />
    </>
  );
};
