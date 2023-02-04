import styled from "styled-components";
import { Row } from "../assets/style/common";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};
export default Layout;

const Wrapper = styled(Row)`
  width: 100vw;
  height: 100vh;
  background-color: #e2e2e2;
`;
