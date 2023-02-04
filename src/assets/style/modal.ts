import styled from "styled-components";
import { Col, Row } from "./common";

export const ModalWrapper = styled(Col)<{ width?: string; height?: string }>`
  z-index: 1000;
  position: absolute;
  width: ${({ width }) => (width ? width : "400px")};
  height: ${({ height }) => (height ? height : "350px")};
  background-color: white;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  border-radius: 6px;
`;
export const ModalTitle = styled.h1`
  position: absolute;
  top: 40px;
  font-size: 22px;
  font-weight: 700;
`;
export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
export const ButtonBox = styled(Row)`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  bottom: 40px;
  gap: 10px;
`;
export const ConfirmButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: ${({ theme }) => theme.blue};
  color: white;
  border-radius: 6px;
`;

export const ClosingButton = styled(ConfirmButton)`
  background-color: ${({ theme }) => theme.red};
`;
export const Accent = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 0px 6px;
`;
