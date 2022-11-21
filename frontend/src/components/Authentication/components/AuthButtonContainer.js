import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
`;

export const AuthButtonContainer = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);
