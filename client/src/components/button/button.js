import styled from "styled-components";

const ButtonContainer = ({
  className,
  children,
  onClick,
  type,
  disabled,
  ...props
}) => (
  <button
    className={className}
    type={type ? type : "submit"}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const Button = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  overflow: hidden;
  width: ${({ width = "20rem" }) => width};
  color: black;
  background: white;
  cursor: pointer;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  font-size: ${({ fontSize = "1.5rem" }) => fontSize};
  padding: 0.5rem;
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
