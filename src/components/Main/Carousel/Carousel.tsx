import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import carouselList from '../../../utils/carousel-list';
import getID from '../../../utils/get-random-id';
import { CarouselImg } from './CarouselImg/CarouselImg';
import { backgroundColor } from '../../../utils/colors';

const SLICE_PX_LETTER = 2;

const CarouselContainer = styled.section`
  width: 800px;
  margin: 50px auto;
  position: static;
  overflow: hidden;
  height: 580px;
`;

const CarouselWrapper = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  transition: all 1s ease-out;
`;

const ArrowsContainer = styled.div`
  width: 200px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const styleArrow = {
  color: '#646464',
  fontSize: '30px',
  cursor: 'pointer',
};

const sliceLastPxFromValue = (value: string): string => {
  return value.slice(0, value.length - SLICE_PX_LETTER);
};

const moveCarouselContainerRight = (element: HTMLDivElement): void => {
  let right = element.style.right;
  if (+sliceLastPxFromValue(right) >= 3280) {
    element.style.right = '10px';
    return;
  }
  right = sliceLastPxFromValue(right);
  right = `${+right + 820}px`;
  element.style.right = right;
};

const moveCarouselContainerLeft = (element: HTMLDivElement): void => {
  let right = element.style.right;
  if (+sliceLastPxFromValue(right) <= 0) {
    element.style.right = '3280px';
    return;
  }
  right = sliceLastPxFromValue(right);
  right = `${+right - 820}px`;
  element.style.right = right;
};

const ShadowWrapper = styled.div`
  z-index: 2;
  width: 800px;
  height: 534px;
  position: absolute;
  box-shadow: 0px 0px 15px 15px ${backgroundColor} inset;
`;

export const Carousel = (): JSX.Element => {
  const [leftCoordWrapper, setLeftCoordWrapper] = useState('');
  const refCarouselWrapper = useRef<HTMLDivElement>(null);
  const refCarouselContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pos = (refCarouselContainer.current as HTMLDivElement).offsetLeft;
    const left = `${pos}`;
    setLeftCoordWrapper(left);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (!isClickCarousel) {
  //       const carousel = refCarouselWrapper.current as HTMLDivElement;
  //       moveCarouselContainerRight(carousel);
  //     }
  //   }, 10000);
  // }, []);

  let isClickCarousel = false;
  let idInterval: NodeJS.Timeout;

  const setIsClickedCarousel = (): void => {
    clearTimeout(idInterval);
    isClickCarousel = true;
    idInterval = setTimeout(() => {
      isClickCarousel = false;
    }, 5000);
  };

  const moveCarouselRight = (): void => {
    setIsClickedCarousel();
    const carousel = refCarouselWrapper.current as HTMLDivElement;
    moveCarouselContainerRight(carousel);
  };

  const moveCarouselLeft = (): void => {
    setIsClickedCarousel();
    const carousel = refCarouselWrapper.current as HTMLDivElement;
    moveCarouselContainerLeft(carousel);
  };

  return (
    <>
      <CarouselContainer ref={refCarouselContainer}>
        {/* <ShadowRight /> */}
        <ShadowWrapper style={{ left: `${leftCoordWrapper}` }} />
        <CarouselWrapper ref={refCarouselWrapper} style={{ right: '10px' }}>
          {carouselList.map((elem) => {
            return <CarouselImg key={getID()} imgUrl={elem} />;
          })}
        </CarouselWrapper>
        <ArrowsContainer>
          <FontAwesomeIcon onClick={moveCarouselLeft} icon={faChevronLeft} style={styleArrow} />
          <FontAwesomeIcon onClick={moveCarouselRight} icon={faChevronRight} style={styleArrow} />
        </ArrowsContainer>
      </CarouselContainer>
    </>
  );
};
