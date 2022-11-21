import { useContext } from "react";
import styled from "styled-components";

const StyledComponent = styled.div`
    min-height: "100%";
    background-color: var(--custom-main-bg);
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 85vh;
    max-width: 1450px;
    margin: 0 auto;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
    border-radius: 44px;
`;

export const MainContainer = (props) => {
    return <StyledComponent>{props.children}</StyledComponent>;
};
