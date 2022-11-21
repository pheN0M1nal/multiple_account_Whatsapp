import styled from "styled-components";

const FormElement = styled.form`
  width: 100%;

  margin-top: 2rem;

  label {
    font-size: var(--font-16);
    letter-spacing: 0.5px;
    display: block;
    text-align: center;
  }
`;

export const FormComponent = ({ children }) => (
  <FormElement>{children}</FormElement>
);
