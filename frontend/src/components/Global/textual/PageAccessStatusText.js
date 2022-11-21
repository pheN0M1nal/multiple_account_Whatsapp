import styled from 'styled-components';

const StyledComponent = styled.span`
    font-size: 1.2rem;
`

export const PageAccessStatusText = ({children}) => {
    return (
        <StyledComponent>
            {children}
        </StyledComponent>
    )
}