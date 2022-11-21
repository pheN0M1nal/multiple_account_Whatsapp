import styled from "styled-components";

const Wrapper = styled.div`
  height: ${({ size }) => size}rem;
  width: ${({ size }) => size}rem;
  border: 1px solid var(--custom-orange);
  border-radius: 50%;
  cursor: pointer;
  display: flex;

  img {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const ProfilePictureBoard = ({ size, children: image }) => (
  <Wrapper size={size}>{image}</Wrapper>
);
