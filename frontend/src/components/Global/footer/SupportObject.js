import styled from 'styled-components';

const StyledComponents = styled.div`
    i{
        font-size: 3rem;
        color: ${({color})=>color};
    }
`

export const SupportObject = ({config}) => {
    return (
        <StyledComponents color={config.brandColor}>
            <i className={config.iconClass}></i>
        </StyledComponents>
    )
}


