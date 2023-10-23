import styled from "styled-components";

const ButtonContainer = ({
  className,
  children,
  onClick,
  disabled,
  ...props
}) => (
  <button className={className} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export const Button = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width = "20rem" }) => width};
  height: ${({ height = "5rem" }) => height};
  background: white;
  cursor: pointer;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  font-size: ${({ fontSize = "1.5rem" }) => fontSize};
  &:hover {
    background: ${({ background = "#37363a" }) => background};
    color: #fff;
  }
  &:disabled {
    background: none;
    hover: none;
    color: #e5e5e5;
    cursor: default;
  }
`;
