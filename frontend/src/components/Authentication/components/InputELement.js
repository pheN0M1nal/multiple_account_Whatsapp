import styled from "styled-components";

const InputElement = styled.input`
  border: none;
  outline: none;
  background-color: var(--custom-transparent);
  width: 100%;
  max-width: 535px;
  height: 50px;

  letter-spacing: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--custom-border-color);
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
