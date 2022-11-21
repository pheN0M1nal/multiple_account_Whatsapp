import { MainWrapper } from "../../Global/MainWrapper";
import { AuthMainContainer } from "../components/AuthMainContainer";
import { LoginForm } from "./Form";

const LoginContainer = () => {
    return (
        <MainWrapper>
            <AuthMainContainer>
                <div className="LoginFormOuter">
                    <h3>
                        <span className="orange_txt">Login</span> To Your Account
                    </h3>
                    <LoginForm />
                </div>
            </AuthMainContainer>
        </MainWrapper>
    );
};

export default LoginContainer;
