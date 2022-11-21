import { Link } from "react-router-dom";
import styled from "styled-components";
import { SizedBox } from "../../Global/SizedBox";

const FooterStyled = styled.div`
  display: flex;
  width: 100%;

  .question {
    font-size: var(--font-16);
    font-weight: 300;
    color: var(--custom-txt-color);
  }

  .proceed_to {
    font-size: var(--font-16);
    color: var(--custom-black);
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-left: 0.3rem;
  }
`;

export const FormFooterPrompt = ({ question, proceed_to, url }) => (
  <FooterStyled>
    <span className="question">{question}</span>
    <SizedBox width={0.2} />
    <Link to={url} className="proceed_to">
      {proceed_to}
    </Link>
  </FooterStyled>
);
