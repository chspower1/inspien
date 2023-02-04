import styled from "styled-components";
import { motion } from "framer-motion";
export const Row = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Col = styled(Row)`
  flex-direction: column;
`;
