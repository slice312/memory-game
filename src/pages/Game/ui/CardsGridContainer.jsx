import styled from "styled-components";
import {GameMode} from "src/shared/constants";


export const CardsGridContainer = ({gameMode, children}) => {
    let rows = 4;
    let columns = 4;

    if (gameMode === GameMode.Mode3x4) {
        rows = 3;
        columns = 4;
    }

    if (gameMode === GameMode.Mode5x6) {
        rows = 5;
        columns = 6;
    }

    if (gameMode === GameMode.Mode6x6) {
        rows = 6;
        columns = 6;
    }

    return (
        <GridContainer rows={rows} columns={columns}>
            {children}
        </GridContainer>
    );
};


const GridContainer = styled.div`
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