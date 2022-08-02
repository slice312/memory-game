import styled from "styled-components";


export const CardsGridContainer = styled.div`
    border: 1px solid #DEDEDE;
    padding: 12px;
    box-shadow: 0 0 4px 4px #DEDEDE;
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    grid-template-rows: repeat(${props => props.rows}, 1fr);
    justify-items: center;
    align-items: stretch;
    gap: 1rem;
    margin: 0 auto;
    width: 100%;
    height: 85%;
    max-width: 720px;
  
    @media (max-width: 576px) {
        gap: 0.5rem;
    }
`;
