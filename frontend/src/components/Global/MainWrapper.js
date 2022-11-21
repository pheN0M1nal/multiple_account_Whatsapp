import styled from "styled-components";
import { MainContainer } from "./MainContainer";
import { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "./navigation/Container";
import { FooterContainer } from "./footer/Container";

const StyledContainer = styled.div`
    padding: 0;
    margin: 0;
    height: 100%;

    .MainContent {
        width: 100%;
        height: 100vh;
        background-color: var(--custom-primary-bg);
        color: var(--custom-white);
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export const NavigationContext = createContext({});

export const MainWrapper = ({ currentPageAnchorKey_, currentSubNavKey_, ...props }) => {
    const [currentSubNavKey, setCurrentSubNavKey] = useState("");
    const [currentPageAnchorKey, setCurrentPageAnchorKey] = useState("");
    const [mobileSubNavEnabled, setMobileSubNavEnabled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <NavigationContext.Provider
            value={{
                currentSubNavKey,
                setCurrentSubNavKey,
                setCurrentPageAnchorKey,
                currentPageAnchorKey,
                mobileSubNavEnabled,
                setMobileSubNavEnabled,
            }}
        >
            <StyledContainer>
                <div className="MainContent">
                    <NavigationContainer />
                    <MainContainer>{props.children}</MainContainer>
                    <FooterContainer />
                </div>
            </StyledContainer>
        </NavigationContext.Provider>
    );
};
