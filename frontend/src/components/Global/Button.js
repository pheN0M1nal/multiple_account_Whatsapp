import styled from "styled-components";

const Wrapper = styled.button`
    margin-top: ${({ marginTop }) => marginTop}rem;
    background-color: var(--custom-${({ BgColor }) => BgColor || "btn-bg"});
    text-align: center;
    font-size: ${({ fontSize }) => fontSize}px;
    padding: ${({ paddingTopBottom }) => paddingTopBottom || 0.2}rem
        ${({ paddingLeftRight }) => paddingLeftRight || 1}rem;
    border-radius: 5px;
    text-transform: ${(props) => (props.textTransform ? `${props.textTransform}` : "lowercase")};
    outline: none;
    border: 1px solid var(--custom-${({ border }) => border || "btn-bg"});
    width: 100%;
    cursor: pointer;
    font-weight: 500;
    min-width: ${(props) => (props.minWidth ? `${props.minWidth}rem` : "fit-content")};
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "initial")};
    height: ${(props) => (props.height ? `${props.height}px` : `34px`)};
    transition: all 0.25s ease-out;
    color: var(--custom-${({ inverted }) => (inverted ? "white" : "black")});
    visibility: ${(props) => (props.disabled === true ? `hidden` : `visible`)};
    cursor: pointer;
    a {
        color: white;
        display: inline-block;
        width: 100%;
    }
    @media (max-width: 600px) {
        font-size: 0.85rem;
        padding: 0.2rem 0rem;
    }
    :hover {
        box-shadow: ${({ addEffect }) => (addEffect ? "0 0 5px var(--custom-orange)" : "null")};
    }
`;
export const Button = ({
    marginTop = 0,
    fontSize = 1,
    addEffect = false,
    paddingTopBottom,
    paddingLeftRight,
    textTransform,
    disabled,
    minWidth,
    maxWidth,
    height,
    BgColor,
    border,
    children,
    onClick,
    inverted = false,
    ...props
}) => (
    <Wrapper
        inverted={inverted}
        paddingTopBottom={paddingTopBottom}
        paddingLeftRight={paddingLeftRight}
        marginTop={marginTop}
        fontSize={fontSize}
        BgColor={BgColor}
        border={border}
        disabled={disabled}
        textTransform={textTransform}
        onClick={onClick}
        minWidth={minWidth}
        height={height}
        maxWidth={maxWidth}
        addEffect={addEffect}
        {...props}
    >
        <>{children}</>
    </Wrapper>
);
