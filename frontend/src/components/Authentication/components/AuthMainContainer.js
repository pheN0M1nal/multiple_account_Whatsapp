import styled from "styled-components";
import loginImg from "../../../static/images/Auth/female-hand-typing-keyboard-laptop.png";
import resetImg from "../../../static/images/Auth/relax-leisure.png";
import { AuthenticationHeader } from "./Header";
import Circle from "../../../static/images/Auth/circle.png";
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    max-width: 1024px;
    width: 90%;
    height: 100%;

    color: var(--custom-txt-color);
    ${"" /* background-color: var(--custom-primary-bg); */}
    position: relative;
    z-index: 0;
    ::after {
        content: "";
        position: absolute;
        top: -100%;
        right: -60%;
        background-image: ${`url(${Circle})`};
        background-position: center;
        background-size: cover;
        width: 50rem;
        height: 50rem;
        z-index: -1;
    }
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
    border: 1px solid var(--custom-input-border);
    background-color: var(--custom-secondry-bg);
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
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
                <div className="AuthContent">
                    <AuthenticationHeader mode={mode} />
                    {children}
                </div>
                <div className=" Imagewrapper">
                    <img
                        src={
                            mode === "login"
                                ? loginImg
                                : mode === "reset_password"
                                ? resetImg
                                : null
                        }
                        alt=""
                    />
                </div>
            </FormWrapper>
        </StyledContainer>
    );
};
