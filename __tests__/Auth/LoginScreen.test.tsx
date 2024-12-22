import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import LoginScreen from '../../src/screens/AuthScreens/LoginScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock the storage module (MMKV)
jest.mock('../../src/utils/Storage', () => ({
  storage: {
    contains: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  const mockNavigation = {navigate: jest.fn(), replace: jest.fn()}; // Mock navigation object

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('navigates to ResetPasswordScreen when Forgot Password is pressed', () => {
    const {getByText} = render(<LoginScreen navigation={mockNavigation} />);

    const forgotPasswordButton = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ResetPasswordScreen');
  });
});

test('renders correctly', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };
  const tree = renderer
    .create(<LoginScreen navigation={mockNavigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
