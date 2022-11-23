import React, { useState } from "react";
// import { useNavigate } from "react-router";
import { Button } from "../../Global/Button";
import { SizedBox } from "../../Global/SizedBox";
import { AuthButtonContainer } from "../components/AuthButtonContainer";
import { FormComponent } from "../components/FormElement";
import { InputComponent } from "../components/InputELement";
import { Spinner } from "../../Global/Spinner";
import styled from "styled-components";
// import { notifyFailure } from "../../../utils/notifications/notifyFailure";
import { EmailRegex } from "../../../utils/formValidators";
import { HandleOnChangeInput } from "../../../utils/formInput/HandleOnChangeInput";

const Wrapper = styled.div`
    input {
        @media (max-width: 1100px) {
            max-width: 100%;
            margin: 0.5rem auto;
        }
    }
    .formfooter {
        @media (max-width: 600px) {
            align-items: center;
            flex-direction: column;
            .formfooterinner {
                align-items: center;
                border: 0px;
                margin-right: 0;
                margin-bottom: 1rem;
            }
            .registerBtn {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        }
    }
`;
export const LoginForm = () => {
    const [data, setData] = useState({
        login: "",
        password: "",
    });
    const [showSpinner, setShowSpinner] = useState(false);

    // const navigate = useNavigate();
    const validateFields = () => {
        let state = true;
        const fields = ["login", "password"];
        for (let field of fields) {
            if (!data[field]) {
                // notifyFailure(`${field} is required`);
                state = false;
            }
            if (!EmailRegex().test(data?.login)) {
                console.log(`${data?.login} is not valid Email`);
                // notifyFailure(`${data?.login} is not valid Email`);
                state = false;
            }
        }
        return state;
    };

    const handleUserLogin = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
        setShowSpinner(true);
        // await axiosServerInstance()
        //     .post(login(), data)
        //     .then((response) => {
        //         window.localStorage.removeItem("guest_selected_quiz");
        //         window.localStorage.removeItem("guest_user_identifier");
        //         console.log("Response data ", response);
        //         const { refresh, access } = response.data;
        //         window.localStorage.setItem("access_token", access);
        //         window.localStorage.setItem("refresh_token", refresh);
        //     })
        //     .catch((err) => {
        //         notifyApiErrorMessage(err);
        //     });

        setShowSpinner(false);
    };

    return (
        <Wrapper>
            <FormComponent>
                <label>Username or Email:</label>
                <InputComponent
                    placeholder={"Username or email here..."}
                    type="email"
                    value={data.login}
                    onChange={(e) => HandleOnChangeInput(e, "login", setData, data)}
                />
                <SizedBox height={1.5} />
                <label>Password:</label>
                <InputComponent
                    placeholder={"Password here... "}
                    type="password"
                    value={data.password}
                    onChange={(e) => HandleOnChangeInput(e, "password", setData, data)}
                />
                <SizedBox height={1.5} />
                <AuthButtonContainer>
                    {!showSpinner ? (
                        <div className="formfooter">
                            <div className="formfooterinner">
                                <Button
                                    textTransform={"uppercase"}
                                    fontSize={16}
                                    maxWidth={200}
                                    border={"transparent"}
                                    height={41}
                                    onClick={handleUserLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="spinner-wrapper">
                            <Spinner size={1.5} />
                        </div>
                    )}
                </AuthButtonContainer>
            </FormComponent>
        </Wrapper>
    );
};
