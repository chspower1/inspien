import styled from "styled-components";
import { Col } from "./common";

export const ModalWrapper = styled(Col)<{ width?: string; height?: string }>`
  z-index: 1000;
  position: absolute;
  width: ${({ width }) => (width ? width : "600px")};
  height: ${({ height }) => (height ? height : "400px")};
  background-color: white;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
export const ConfirmButton = styled.button`
  width: 100px;
  height: 60px;
  background-color: ${({ theme }) => theme.main};
  color: white;
`;

export const ClosingButton = styled(ConfirmButton)`
  background-color: ${({ theme }) => theme.danger};
`;
