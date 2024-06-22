export enum PopupType {
  ONE_BUTTON,
  TWO_BUTTONS,
}

export enum MessageType {
  COMMON,
  ERROR,
}

export interface PopupDataProps {
  typeMessage: MessageType;
  title?: string;
  message?: string;
  children?: JSX.Element;
  horizontalBtn?: boolean;
  onClosePopup?: () => void;
}

export interface OneButtonProps {
  type: PopupType.ONE_BUTTON;
  primaryBtnText?: string;
  onPressPrimaryBtn?: () => void;
}

export interface TwoButtonProps {
  type: PopupType.TWO_BUTTONS;
  primaryBtnText?: string;
  onPressPrimaryBtn?: () => void;
  secondaryBtnText?: string;
}

export type PopupProps = PopupDataProps & (OneButtonProps | TwoButtonProps);
