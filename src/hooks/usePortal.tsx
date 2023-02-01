import { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
interface ModalProps {
  children: ReactNode | JSX.Element;
}
const usePortal = () => {
  const [isMount, setIsMount] = useState(false);

  const Portal = ({ children }: ModalProps) => {
    return isMount
      ? ReactDOM.createPortal(
          <>
            {children}
            <Overlay onClick={() => setIsMount(false)} />
          </>,
          document.getElementById("modal-root") as HTMLElement
        )
      : null;
  };
  return { Portal, isMount, setIsMount };
};

export default usePortal;
const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
