import { Orbit } from "@uiball/loaders";
import styled from "styled-components";

const LoaderContainer = ({ className }) => (
  <div className={className}>
    <div className="loader">
      <Orbit size={35} color="#231F20" />
    </div>
  </div>
);

export const Loader = styled(LoaderContainer)`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 400;
  top: 0;
  left: 0;
  background: #e5e5e5;

  & .loader {
    position: fixed;
    top: 50%;
    left: 50%;
  }
`;
