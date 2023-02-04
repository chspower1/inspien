import styled from "styled-components";
import { Col, Row } from "./common";
import { Variants, motion } from "framer-motion";
const MODAL_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    x: "-50%",
    y: "-40%",
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: "-50%",
    scale: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.7 },
  },
  exit: {
    opacity: 0,
    y: "-40%",
    scale: 0.95,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  },
};
const OVERLAY_VARIANTS: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
export const ModalWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 3000;
`;
export const ModalContainer = styled(Col).attrs({
  variants: MODAL_VARIANTS,
  initial: "initial",
  animate: "animate",
  exit: "exit",
})<{ width?: string; height?: string }>`
  z-index: 1000;
  position: absolute;
  width: ${({ width }) => (width ? width : "400px")};
  height: ${({ height }) => (height ? height : "350px")};
  background-color: white;
  left: 50%;
  top: 50%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  transform: translateX(50%);
  border-radius: 6px;
`;
export const ModalTitle = styled.h1`
  position: absolute;
  top: 40px;
  font-size: 22px;
  font-weight: 700;
`;
export const Overlay = styled(motion.div).attrs({
  variants: OVERLAY_VARIANTS,
  initial: "initial",
  animate: "animate",
  exit: "exit",
})`
  position: absolute;
  width: 100vw;
  height: 100vh;
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
