import {ViewStyle} from 'react-native';

export interface IButtonProps {
  text: string;
  buttonPressed: () => void;
  extraStyle: ViewStyle;
  isDisabled: boolean;
  loading: boolean;
  loaderColor?: string;
}

export interface ITermsPolicyProps {
  isVisible: boolean;
  onClose: () => void;
  modalTitle: string;
}

export interface IFloatinButtonProps {
  onPressAction: () => void;
}

export interface IHeaderTrackStatusProps {
  activeIndex: number;
}

export interface IDropDownProps {
  dataList: {[key: string]: any}[];
  value: string;
  onValue: (text: string) => void;
  label: string;
  placeholder: string;
}
export interface IUserInfoProps {
  onNext: () => void;
}
