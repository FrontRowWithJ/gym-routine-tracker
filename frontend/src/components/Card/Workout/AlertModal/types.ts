export interface AlertModalProps {
  close: () => void;
  message: string;
  callback: () => void;
}
