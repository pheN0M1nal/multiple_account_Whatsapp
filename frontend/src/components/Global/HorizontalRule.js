import styled from 'styled-components';

const Component = styled.hr`
    background-color:var(--custom-deep-line_break-color);
    width: 100%;
    height: 1px !important;
    margin: 0;
    border: none;
`


export const HorizontalRule = () => (
    <Component/>
)