import styled from 'styled-components';

const Categories = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease-out;
  align-items: center;
  margin: 20px 0;
  padding: 20px 50px;
  text-align: center;
  &:hover {
    background-color: #3500d4;
    color: #ffffff;
    box-shadow: 0px 3px 10px 5px rgba(255, 255, 255, 0.3);
    border-radius: 0 50px;
  }
`;

interface ICategory {
  catName: string;
}

export const Category: React.FC<ICategory> = ({ catName }) => {
  return (
    <>
      <Categories>{catName}</Categories>
    </>
  );
};
