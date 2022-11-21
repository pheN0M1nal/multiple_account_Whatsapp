import { MainWrapper } from "../../Global/MainWrapper";
import { AuthMainContainer } from "../components/AuthMainContainer";
import { ResetPasswordForm } from "./Form";

export const ResetPasswordContainer = ({ emailVerificationID }) => {
  return (
    <MainWrapper>
    <AuthMainContainer mode={"reset_password"}>
      <ResetPasswordForm emailVerificationID={emailVerificationID} />
    </AuthMainContainer>
    </MainWrapper>
  );
};
