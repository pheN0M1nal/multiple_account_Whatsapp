import { useContext } from "react";
import styled from "styled-components";

const StyledComponent = styled.div`
    min-height: "100%";
    display: flex;
    justify-content: center;
    .chat_app {
        background-color: var(--custom-main-bg);
        display: flex;
        justify-content: center;
        overflow: hidden;
        width: 100%;
        height: 85vh;
        max-width: 1450px;
        z-index: 1;
        margin: 0 auto;
        position: relative;

        border-radius: 44px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
    }
`;

export const MainContainer = (props) => {
    return <StyledComponent>{props.children}</StyledComponent>;
};
