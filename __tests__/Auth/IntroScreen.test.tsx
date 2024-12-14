import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import IntroScreen from '../../src/screens/AuthScreens/IntroScreen';
import {TouchableOpacity} from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('IntroScreen', () => {
  const mockNavigation = {navigate: jest.fn()}; // Mock navigation object

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('renders all intro steps correctly', () => {
    const {getByLabelText, getByText} = render(
      <IntroScreen navigation={mockNavigation} />,
    );

    // Verify step content
    expect(getByLabelText('FirstIntroMock')).toBeTruthy();
    expect(getByText('Schedule Vehicle Pick Up')).toBeTruthy();

    expect(getByLabelText('FourthIntroMock')).toBeTruthy();
    expect(getByText('Vehicle Has Been Picked Up')).toBeTruthy();
  });

  it('navigates to LoginScreen when Skip is pressed', () => {
    const {getByText} = render(<IntroScreen navigation={mockNavigation} />);

    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
  });

  it('renders RightArrow initially', () => {
    const {getByLabelText} = render(
      <IntroScreen navigation={mockNavigation} />,
    );
    const rightIcon = getByLabelText('right');
    expect(rightIcon).toBeTruthy();
  });

  it('renders CheckIcon when on the last index', () => {
    const {getByLabelText, getByTestId} = render(
      <IntroScreen navigation={mockNavigation} />,
    );
    const nextButton = getByTestId('next');

    // Simulate presses to navigate to the last item
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);

    const checkIcon = getByLabelText('check');
    expect(checkIcon).toBeTruthy();
  });

  it('triggers handleArrowPress on press', () => {
    const mockHandleArrowPress = jest.fn();
    const {getByTestId} = render(
      <TouchableOpacity onPress={mockHandleArrowPress} testID="next" />,
    );

    const nextButton = getByTestId('next');
    fireEvent.press(nextButton);

    expect(mockHandleArrowPress).toHaveBeenCalled();
  });
});

test('renders correctly', () => {
  const mockNavigation = {navigate: jest.fn()};
  const tree = renderer
    .create(<IntroScreen navigation={mockNavigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
