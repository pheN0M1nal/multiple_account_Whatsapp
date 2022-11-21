import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { logout } from "../../../api";
import axiosServerInstance from "../../../config/api/axios";
import { notifySuccess } from "../../../utils/notifications/notifySuccess";
import { Button } from "../../Global/Button";
import { Spinner } from "../../Global/Spinner";

const StyledContainer = styled.div`
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--custom-main-background);
`;

const LogoutContainer = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    const handleOnClickLogoutButton = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        await axiosServerInstance()
            .post(logout())
            .then((response) => {
                if (response) {
                    window.localStorage.removeItem("access_token");
                    window.localStorage.removeItem("refresh_token");
                }
            })
            .catch((err) => {});
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        notifySuccess("Logged out");
        // window.location.reload();
        navigate("/login", { replace: true });
        window.location.reload();
    };

    return (
        <StyledContainer>
            {showSpinner ? (
                <Spinner />
            ) : (
                <Button
                    onClick={(e) => handleOnClickLogoutButton(e)}
                    height={54}
                    fontSize={16}
                    maxWidth={535}
                >
                    Proceed to Logout
                </Button>
            )}
        </StyledContainer>
    );
};

export default LogoutContainer;
