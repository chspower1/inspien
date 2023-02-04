import { ItemType } from "./mockupData";

export interface ModalProps {
  isMount: boolean;
  setIsMount: React.Dispatch<React.SetStateAction<boolean>>;
  type: ItemType;
}
