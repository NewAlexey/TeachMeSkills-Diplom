import styled from 'styled-components';

const CustomSpinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  transform: translate(0, 200%);
  &::after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #8d33da transparent #8d33da transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = (): JSX.Element => {
  return <CustomSpinner />;
};
