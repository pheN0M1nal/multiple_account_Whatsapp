import { Button } from "../../Global/Button";
import { SizedBox } from "../../Global/SizedBox";
import { AuthButtonContainer } from "../components/AuthButtonContainer";
import { InputComponent } from "../components/InputELement";
import { FormComponent } from "../components/FormElement";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePickerComponent } from "../../../helpers/fileManagement/ProfilePicturePickerComponent";
import { Spinner } from "../../Global/Spinner";
import { notifyFailure } from "../../../helpers/notifications/notifyFailure";
import { HandleOnChangeInput } from "../../../helpers/formInput/HandleOnChangeInput";
import { notifyApiErrorMessage } from "../../../helpers/notifications/notifyApiErrorMessage";
import axiosServerInstance from "../../../config/api/axios";
import { userSignup } from "../../../api";
import { notifySuccess } from "../../../helpers/notifications/notifySuccess";
import ReactToolTip from "../../../helpers/tooltipComponent";
import { useCallback } from "react";

// import { FormFooterPrompt } from "../components/FormFooterPrompt";

export const RegistrationForm = () => {
    const [files, setFiles] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        business_name: "",
        website_address: "",
        logo: "",
    });

    const validateFields = () => {
        // const logValidationMessages = (messages) => {
        //     for (let message of messages) {
        //         notifyFailure(message);
        //     }
        // };
        let fields = [
            "full_name",
            "email",
            "phone_number",
            "password",
            "confirm_password",
            "business_name",
            "website_address",
        ];
        let genState = true;
        for (let field of fields) {
            if (!data[field]) {
                notifyFailure(`${field} is required`);
                genState = false;
            }
        }
        if (data?.password !== data?.confirm_password) {
            notifyFailure(`Your passwords doesn't match`);
            genState = false;
        }
        return genState;
    };

    const uploadFile = useCallback(async () => {
        if (files?.image) {
            console.log(files?.image?.to_be_uploaded_buffer);
            let tempData = { ...data };
            tempData["logo"] = files?.image?.to_be_uploaded_buffer;
            setData(tempData);
        }
    }, [files]);
    useEffect(() => {
        uploadFile();
    }, [uploadFile]);

    const handleUserSignup = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
      
        let formData = new FormData();
        for (let field in data) {
            formData?.append(field, data[field]);
        }
        console.log(formData, "signup");
        setShowSpinner(true);
        await axiosServerInstance()
            .post(userSignup(), formData)
            .then((response) => {
                if (response) {
                    navigate(`/login`, { replace: true });
                }
                notifySuccess("Registered successfully");
            })
            .catch((err) => {
                notifyApiErrorMessage(err);
            });
        setShowSpinner(false);
    };

    const handleOnClickLogin = () => {
        navigate(`/login`, { replace: true });
    };

    return (
        <FormComponent>
            <div className="inputOuter">
                <InputComponent
                    placeholder={"Full Name"}
                    type="text"
                    height={2.5}
                    value={data?.full_name}
                    onChange={(e) => HandleOnChangeInput(e, "full_name", setData, data)}
                />
            </div>
            <div className="inputOuter">
                <InputComponent
                    placeholder={"Email"}
                    type="email"
                    height={2.5}
                    value={data?.email}
                    onChange={(e) => HandleOnChangeInput(e, "email", setData, data)}
                />
            </div>
            <div className="inputOuter">
                <InputComponent
                    placeholder={"phone number"}
                    type="text"
                    height={2.5}
                    value={data?.phone_number}
                    onChange={(e) => HandleOnChangeInput(e, "phone_number", setData, data)}
                />
            </div>
            <div className="inputOuter">
                <InputComponent
                    placeholder={"password"}
                    type="password"
                    height={2.5}
                    value={data?.password}
                    onChange={(e) => HandleOnChangeInput(e, "password", setData, data)}
                />
            </div>
            <div className="inputOuter">
                <InputComponent
                    placeholder={"Confirm Password"}
                    type="password"
                    height={2.5}
                    value={data?.confirm_password}
                    onChange={(e) => HandleOnChangeInput(e, "confirm_password", setData, data)}
                />
            </div>

            <div className="inputOuter">
                {/* <ReactToolTip
                    theme="dark"
                    position="top"
                    title="Please Add your business name compulsory."
                > */}
                    <InputComponent
                        placeholder={"Business name"}
                        type="text"
                        height={2.5}
                        value={data?.business_name}
                        onChange={(e) => HandleOnChangeInput(e, "business_name", setData, data)}
                    />
                {/* </ReactToolTip> */}
            </div>
            <div className="inputOuter">
                {/* <ReactToolTip
                    theme="dark"
                    position="top"
                    title="Please Add your website address compulsory."
                > */}
                    <InputComponent
                        placeholder={"website_address"}
                        type="url"
                        height={2.5}
                        value={data?.website_address}
                        onChange={(e) => HandleOnChangeInput(e, "website_address", setData, data)}
                    />
                {/* </ReactToolTip> */}
            </div>
            <div className="inputOuter">
                <div className="profilePicturePickerWrapper">
                    <ImagePickerComponent
                        image={files?.image?.url_on_server}
                        field_name={"image"}
                        purpose={"Business Logo"}
                        label={"Profile Image"}
                        setFiles={setFiles}
                    />
                    <SizedBox height={3} />
                </div>
            </div>
            <div className="FormFooterOption">
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
                                    onClick={handleUserSignup}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div className="registerBtn">
                                <p>Already have an account?</p>
                                <Button
                                    textTransform={"uppercase"}
                                    fontSize={16}
                                    maxWidth={200}
                                    height={41}
                                    BgColor={"transparent"}
                                    border={"border-color"}
                                    onClick={handleOnClickLogin}
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
            </div>
        </FormComponent>
    );
};
