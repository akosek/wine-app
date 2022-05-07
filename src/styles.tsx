import styled from "styled-components";

export const HomeHeader = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 30px;
  }
`;

export const HomeContainer = styled.div`
   {
    padding: 16px;
    justify-content: center;
  }
`;

export const WineList = styled.div`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const HeaderText = styled.h3`
   {
    margin-right: 20px;
  }
`;

export const CardTitle = styled.h3`
   {
    font-size: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: bold;
    min-height: 50px;
  }
`;
export const CardPicture = styled.img`
   {
    width: 100%;
    height: 15vw;
    object-fit: contain;
  }
`;
export const ButtonContainer = styled.div`
   {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const EmptyBox = styled.div`
   {
    display: flex;
    border: 3px dotted black;
    border-radius: 4px;
    width: 16rem;
    margin: 16px;
    align-items: center;
    justify-content: center;
  }
`;

export const CenteredRow = styled.div`
   {
    text-align: center;
  }
`;
