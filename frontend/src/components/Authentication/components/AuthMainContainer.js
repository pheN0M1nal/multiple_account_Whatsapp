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
h3{
    font-size:24px;
    font-weight:700;
}
    .LoginFormOuter {
        width: 100%;
    }
    .txtlogo {
        color: var(--custom-txt-logo);
        font-size: var(--font-74);
    }
`;
const FormWrapper = styled.div`
    display: flex;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    background:#fff;
    padding:2rem;
    overflow: hidden;
    border-radius: 44px;
    animation: shake 1s;
    @media (max-width: 1100px) {
        flex-direction: column-reverse;
    }
    .Imagewrapper {
        display: flex;
        width: 30rem;
        height: 30rem;
        border-right:1px solid #b9b9b9;
        img {
        border:none;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        @media (max-width: 1100px) {
            height: 200px;
            width: 100%;
            flex-basis: auto;
        }
    }
    .AuthContent {
        display: flex;
        flex-direction: column;
        flex: auto;
        padding:3rem;
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
                    <img src={loginImg} alt="" />
                </div>
                <div className="AuthContent">
                    <AuthenticationHeader mode={mode} />
                    {children}
                </div>
            </FormWrapper>
        </StyledContainer>
    );
};
