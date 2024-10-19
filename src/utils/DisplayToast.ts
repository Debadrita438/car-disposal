import Toast, {ToastType} from 'react-native-toast-message';
import {Colors, Fonts} from '../theme';

export const displayToast = (message: string, messageType: ToastType) => {
  Toast.show({
    type: messageType,
    text1: message,
    text1Style: {
      fontFamily: Fonts.regular,
      color: Colors.blackColor,
      fontSize: 12,
      fontWeight: '400',
    },
  });
};
