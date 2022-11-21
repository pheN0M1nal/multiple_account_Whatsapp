import styled from "styled-components";
import { CompanyLogo } from "../../CompanyLogo";
import { Link } from "react-router-dom";

const StyledComponent = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }
  .brandLogo {
    font-size: var(--font-26);
    color: var(--custom-txt-logo);
    font-weight: 700;
  }

  @media screen and (max-width: 875px) {
    padding: 0 1rem;
  }
`;

export const NavigationBrandContainer = () => {
  return (
    <StyledComponent>
      <Link to={"/"} className="brandLogo">
        <CompanyLogo size={1.5} />
      </Link>
    </StyledComponent>
  );
};
