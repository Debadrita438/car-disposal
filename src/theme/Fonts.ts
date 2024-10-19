import * as Colors from './Colors';

const regular = 'Poppins-Regular';
const bold = 'Poppins-Bold';
const semiBold = 'Poppins-SemiBold';
const medium = 'Poppins-Medium';

const headerText = {
  fontFamily: bold,
  fontSize: 22,
  color: Colors.appTextColor,
};

const infoHeaderText = {
  fontFamily: semiBold,
  fontSize: 22,
  color: Colors.textColor,
  textAlign: 'center',
};

const infoDescText = {
  fontFamily: regular,
  fontSize: 13,
  color: Colors.textColor,
  textAlign: 'center',
};

const rememberText = {
  fontFamily: regular,
  fontSize: 14,
  color: Colors.grayTextColor,
};

const bottomText = {
  fontFamily: regular,
  fontSize: 14,
  color: Colors.textColor,
};
export {
  regular,
  semiBold,
  bold,
  headerText,
  infoHeaderText,
  infoDescText,
  rememberText,
  bottomText,
  medium,
};
