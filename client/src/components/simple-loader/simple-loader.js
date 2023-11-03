import { Orbit } from "@uiball/loaders";
import styled from "styled-components";

const SimpleLoaderContainer = ({ className }) => (
  <div className={className}>
    <Orbit size={35} color="#231F20" />
  </div>
);

export const SimpleLoader = styled(SimpleLoaderContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
`;
