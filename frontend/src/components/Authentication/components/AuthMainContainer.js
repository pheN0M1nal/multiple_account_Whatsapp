import styled from "styled-components";
import loginImg from "../../../assets/images/login_img.png";
import { AuthenticationHeader } from "./Header";
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    max-width: 1024px;
    width: 90%;
    height: 100%;

    color: var(--custom-txt-color);
    position: relative;
    z-index: 0;

    .LoginFormOuter {
        width: 100%;
    }
    .txtlogo {
        color: var(--custom-txt-logo);
        font-size: var(--font-74);
    }
    .Imagewrapper {
        display: "inline-block";
        width: 20rem;

        flex-basis: content;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media (max-width: 1100px) {
            height: 200px;
            width: 100%;
            flex-basis: auto;
        }
    }
`;
const FormWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    overflow: hidden;
    border-radius: 44px;
    animation: shake 1s;
    @media (max-width: 1100px) {
        flex-direction: column-reverse;
    }
    .AuthContent {
        display: flex;
        flex-direction: column;
        flex: auto;
        padding-left: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        @media (max-width: 1100px) {
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }
    .formfooter {
        display: flex;
        .formfooterinner {
            flex-direction: column;
            display: flex;
            width: 100%;
            border-right: 1px solid var(--custom-border-color);
            margin-right: 2rem;
        }
        .registerBtn {
            width: 100%;
            p {
                color: var(--custom-txt-color);
                margin-bottom: 1rem;
            }
        }
    }
`;

export const AuthMainContainer = ({ mode, children }) => {
    return (
        <StyledContainer>
            <FormWrapper>
                <div className=" Imagewrapper">
                    <img src={mode === "login" && loginImg} alt="" />
                </div>
                <div className="AuthContent">
                    <AuthenticationHeader mode={mode} />
                    {children}
                </div>
            </FormWrapper>
        </StyledContainer>
    );
};
