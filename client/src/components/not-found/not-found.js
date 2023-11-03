import styled from "styled-components";

const NotFoundContainer = ({ className }) => {
  return (
    <h1 className={className}>
      Такой страницы не существует или у вас недостаточно прав...
    </h1>
  );
};

export const NotFound = styled(NotFoundContainer)``;
