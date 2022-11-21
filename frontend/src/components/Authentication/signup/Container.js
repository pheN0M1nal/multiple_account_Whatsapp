import { AuthenticationHeader } from "../components/Header";
import { AuthMainContainer } from "../components/AuthMainContainer";
import { RegistrationForm } from "./Form";
import styled from "styled-components";
import { MainWrapper } from "../../Global/MainWrapper";

const Wrapper = styled.div`
    .LoginFormOuter {
        border-radius: 10px;

        max-width: 90%;
        margin: 0 auto;
        margin-left: 3%;
        padding: 0rem 0rem 2rem;
        .title {
            font-size: 2rem;
            font-weight: 400;
            text-transform: uppercase;
            color: var(--custom-black);
            @media (max-width: 1100px) {
                font-size: 1.4rem;
            }
        }
        .FormFooterOption {
            max-width: 70%;
            width: 100%;
            @media (max-width: 900px) {
                max-width: 100%;
            }
        }
        .formfooter {
            @media (max-width: 600px) {
                flex-direction: column;
            }
            .formfooterinner {
                justify-content: flex-end;
                @media (max-width: 600px) {
                    justify-content: center;
                    align-items: center;
                    border: 0;
                    margin-right: 0;
                    margin-bottom: 1rem;
                }
            }
            .registerBtn {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .profilePicturePickerWrapper {
            height: 3rem;
            margin-top: 1.2rem;
        }
        .profilePicturePickerWrapper > div {
            justify-content: space-around;
            gap: 0.5rem;
            .controlsWrapperImage .text {
                color: var(--custom-txt-color);
                font-size: 1rem;
                font-weight: 400;
                @media (max-width: 426px) {
                    font-size: 0.7rem;
                }
                @media (max-width: 375px) {
                    display: none;
                }
            }
            .controlsWrapperImage {
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
                width: 100%;
                border-bottom: 1px solid var(--custom-border-color);
                padding-bottom: 0.7rem;
            }
            .controlsWrapperImage button {
                background-color: #f3f3f2;
                color: black;
                font-size: 1rem;
                border-radius: 2.5rem;
            }
            .imageWrapper {
                display: none;
            }
        }
        form {
            max-width: 100%;
            width: 100%;
            gap: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .inputFile {
                border-bottom: 1px solid var(--custom-border-color);
                padding-bottom: 1.5rem;
                .inputFileinner {
                    display: flex;
                    flex-direction: row-reverse;
                    align-items: flex-end;
                    p {
                        flex: auto;
                        width: 100%;
                    }
                }

                label {
                    justify-content: center;
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--custom-border-color);
                    border-radius: 2.5rem;
                    background: #ddd;
                    min-width: 150px;
                    height: 40px;
                }
            }

            .inputOuter {
                width: 48%;
                @media (max-width: 810px) {
                    width: 100%;
                    input {
                        max-width: 100%;
                    }
                }
            }

            label {
                text-align: center;
            }
            .SignupLogin > div {
                flex-direction: column;
                align-items: center;
                a {
                    border: 1px solid var(--custom-orange);
                    background-color: var(--custom-orange);
                    color: var(--custom-white);
                    padding: 0.4rem 2rem;
                    border-radius: 10px;
                }
            }
        }
    }
    .Imagewrapper {
        display: none;
        height: 0px !important  ;
    }
`;

const RegisterContainer = () => {
    return (
        <MainWrapper>
            <Wrapper>
                <AuthMainContainer mode={"register"}>
                    <div className="LoginFormOuter">
                        <h2 className="title">make a new account</h2>
                        <RegistrationForm />
                    </div>
                </AuthMainContainer>
            </Wrapper>
        </MainWrapper>
    );
};

export default RegisterContainer;
