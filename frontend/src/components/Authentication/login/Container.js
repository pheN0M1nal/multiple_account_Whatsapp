import { MainWrapper } from "../../Global/MainWrapper";
import { AuthMainContainer } from "../components/AuthMainContainer";
import { LoginForm } from "./Form";

const LoginContainer = () => {
  return (
    <MainWrapper>
    
      <AuthMainContainer mode={"login"}>
        <div className="LoginFormOuter">
          <LoginForm />
        </div>
      </AuthMainContainer>
      
    </MainWrapper>
  );
};

export default LoginContainer;
