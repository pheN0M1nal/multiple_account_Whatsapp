import styled from "styled-components";

const Wrapper = styled.div`
    text-align: left;
    @media (max-width: 1100px) {
        text-align: center;
    }
    .sub-header {
        font-size: 2rem;
        text-transform: capitalize;
        line-height: 3rem;
        font-weight: 400;
        font-family: var(--font-1);
        margin-top: 1.2rem;
        color: var(--custom-black);
        @media (max-width: 1100px) {
            font-size: 1.4rem;
        }
        @media (max-width: 600px) {
            margin-top: 0rem;
        }
    }
`;

const modeHeaderMapping = {
    login: "Login To Your Account",
    forgot_password: "Forgot Password",
    reset_password: "ENTER YOUR NEW PASSWORD",
};

export const AuthenticationHeader = ({ mode }) => {
    return (
        <Wrapper>
            <div className="sub-header">{modeHeaderMapping[mode]}</div>
        </Wrapper>
    );
};
