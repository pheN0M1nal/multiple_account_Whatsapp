import styled from "styled-components";

const InputElement = styled.input`
  border: 1px solid #FF8D03;
  outline: none;
  background-color: #F5F5F5;
  width: 100%;
  max-width: 535px;
  height: 50px;
border-radius:5px;
  letter-spacing: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--custom-txt-color);
  font-size: var(--font-16);
  text-indent: 10px;
  
`;

export const InputComponent = ({
  children,
  fontSize,
  paddingX,
  paddingY,
  ...props
}) => (
  <InputElement
    fontSize={fontSize}
    paddingX={paddingX}
    paddingY={paddingY}
    {...props}
  >
    {children}
  </InputElement>
);
