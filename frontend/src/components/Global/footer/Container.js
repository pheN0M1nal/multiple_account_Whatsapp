import styled from "styled-components";
const StyledComponents = styled.div`
    color: var(--custom-footer-txt);
    font-family: var(--font-1);
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #e8e8e8;
    margin: 0 auto;

    .footerWrapper {
        width: 100%;
        border-top: 1px solid var(--custom-border-color);
        padding: 0 1rem;
    }
    .copyrightWrapper {
        font-size: 0.9rem;
        color: var(--custom-txt-color);
        letter-spacing: 0.3px;
        display: flex;
        justify-content: center;
        margin: 1rem 0;
        width: 100%;
        @media (max-width: 920px) {
        }
    }
`;

export const FooterContainer = () => {
    return (
        <StyledComponents>
            <div className="footerWrapper">
                <div className="copyrightWrapper">&copy; Copyright auto advert 2022</div>
            </div>
        </StyledComponents>
    );
};
