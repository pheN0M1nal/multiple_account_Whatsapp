import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { resetPasswordStep1 } from "../../../api";
import axiosServerInstance from "../../../config/api/axios";
import { HandleOnChangeInput } from "../../../utils/formInput/HandleOnChangeInput";
import { notifyApiErrorMessage } from "../../../utils/notifications/notifyApiErrorMessage";
import { notifyFailure } from "../../../utils/notifications/notifyFailure";
import { notifySuccess } from "../../../utils/notifications/notifySuccess";
import { Button } from "../../Global/Button";
import { SizedBox } from "../../Global/SizedBox";
import { Spinner } from "../../Global/Spinner";
import { AuthButtonContainer } from "../components/AuthButtonContainer";
import { FormComponent } from "../components/FormElement";
import { InputComponent } from "../components/InputELement";

const Wrapper = styled.div`
    width: 100%;
    min-width: 400px;
    @media (max-width: 600px) {
        min-width: 100%;
    }
    h2 {
        font-size: 2rem;
        font-weight: 400;
        @media (max-width: 600px) {
            font-size: 1.4rem;
        }
    }
`;

export const ForgotPasswordForm = () => {
    const [data, setData] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);

    const handleOnClickProceedButton = (e) => {
        e.preventDefault();
        handleInitiateForgotPassword();
    };

    const handleInitiateForgotPassword = async () => {
        setShowSpinner(true);
        axiosServerInstance()
            .post(resetPasswordStep1(), data)
            .then((response) => {
                notifySuccess(`A password reset link has been sent to ${data?.email}`);
                setShowSpinner(false);
            })
            .catch((err) => {
                notifyApiErrorMessage(err);
                setShowSpinner(false);
            });
    };
    return (
        <Wrapper>
            <FormComponent>
                <h2>Enter YOUR EMAIL ADDRESS</h2>

                <InputComponent
                    placeholder={"Email"}
                    type="email"
                    value={data?.email}
                    onChange={(e) => HandleOnChangeInput(e, "email", setData, data)}
                />
                <SizedBox height={1.5} />
                <AuthButtonContainer>
                    {showSpinner ? (
                        <Spinner />
                    ) : (
                        <>
                            <Button
                                textTransform={"uppercase"}
                                height={54}
                                fontSize={16}
                                maxWidth={250}
                                onClick={handleOnClickProceedButton}
                            >
                                SEND VERFICATION LINK
                            </Button>
                            <SizedBox height={1.0} />
                        </>
                    )}
                </AuthButtonContainer>
            </FormComponent>
        </Wrapper>
    );
};
