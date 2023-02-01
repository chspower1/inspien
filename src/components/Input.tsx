import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { Col } from "../assets/style/common";
interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage: string | null;
  [key: string]: any;
}
const Input = ({ register, label, name, type = "text", errorMessage, ...rest }: InputProps) => {
  return (
    <InputBox>
      <Label htmlFor={name}>{label}</Label>
      <InputStyle id={name} type={type} {...register} {...rest} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputBox>
  );
};
export default Input;

export const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 74px;
`;
export const InputBox = styled(Col)`
  position: relative;
  align-items: flex-start;
  width: 500px;
  height: 60px;
  margin-bottom: 30px;
`;
export const Label = styled.label`
  color: #2d3436;
  font-size: 16px;
  margin-bottom: 14px;
`;
export const InputStyle = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  padding: 0px;
  border: 1px solid black;
`;
export const SubmitButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 16px;
  color: white;
  background-color: #d63031;
  border-radius: 6px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #bd2828;
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  font-size: 12px;
  right: 0px;
  bottom: -16px;
  color: #d45d67;
`;

export const Subtitle = styled.span`
  position: absolute;
  bottom: 100px;
  right: 50%;
  transform: translateX(50%);
  font-size: 16px;
  color: #a0a0a0;
  transition: color 0.3s ease;
  &:hover {
    color: #da1703;
  }
`;
