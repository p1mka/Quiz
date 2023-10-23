import styled from "styled-components";

export const Input = styled.input`
  width: ${({ width = "auto" }) => width};
  padding: 0 0.5rem;
  font-size: 20px;
  font-weight: bold;
  min-height: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
`;
