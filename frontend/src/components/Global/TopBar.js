import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: var(--custom-txt-color);
  display: flex;
  flex: auto;
  text-transform: uppercase;
  border-radius: 2.5rem;
  background-color: var(--custom-white);
  padding: 0.8rem 1.5rem;
  @media (max-width:680px) {
    width:100%;
  }
`;
export const TopBar = ({ title }) => {
  return <Wrapper>{title}</Wrapper>;
};
