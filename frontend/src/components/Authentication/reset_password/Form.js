import { useEffect, useState } from "react";
import { Button } from "../../Global/Button";
import { SizedBox } from "../../Global/SizedBox";
import { FormComponent } from "../components/FormElement";
import { InputComponent } from "../components/InputELement";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordStep2 } from "../../../api";
import { HandleOnChangeInput } from "../../../helpers/formInput/HandleOnChangeInput";
import styled from "styled-components";
import { Spinner } from "../../Global/Spinner";
import axiosServerInstance from "../../../config/api/axios";
import { notifySuccess } from "../../../helpers/notifications/notifySuccess";
import { notifyApiErrorMessage } from "../../../helpers/notifications/notifyApiErrorMessage";

const Wrapper = styled.div`
    form {
        @media (max-width: 1100px) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    input {
        @media (max-width: 1100px) {
            max-width: 100%;
        }
    }
`;

export const ResetPasswordForm = () => {
    const [data, setData] = useState({});
    const [resetPasswordToken, setResetPasswordToken] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClickButton = (e) => {
        e.preventDefault();
        handleProceedResetPassword();
    };

    const handleProceedResetPassword = () => {
        const requestData = {
            ...data,
            token: resetPasswordToken,
        };
        setShowSpinner(true);
        axiosServerInstance()
            .post(resetPasswordStep2(), requestData)
            .then((response) => {
                notifySuccess("Password reset successfully");
                navigate("/", { replace: true });
            })
            .catch((err) => {
                notifyApiErrorMessage(err);
                setShowSpinner(false);
            });
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get("token")) {
            setResetPasswordToken(query.get("token"));
        }
    }, [location]);
    return (
        <Wrapper>
            <FormComponent>
                <InputComponent
                    placeholder={"password"}
                    type="password"
                    value={data?.password}
                    onChange={(e) => HandleOnChangeInput(e, "password", setData, data)}
                />
                <SizedBox height={1.0} />
                <InputComponent
                    placeholder={"Confirm Password"}
                    type="password"
                    value={data?.confirm_password}
                    onChange={(e) => HandleOnChangeInput(e, "confirm_password", setData, data)}
                />
                <SizedBox height={1.5} />
                {showSpinner ? (
                    <Spinner />
                ) : (
                    <Button
                        fontWeight={500}
                        fontSize={18}
                        maxWidth={200}
                        textTransform={"uppercase"}
                        borderRadius={1.5}
                        height={54}
                        paddingTopBottom={0.4}
                        onClick={handleOnClickButton}
                    >
                        UPDATE
                    </Button>
                )}
            </FormComponent>
        </Wrapper>
    );
};
