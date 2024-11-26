import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import IntroScreen from '../../src/screens/AuthScreens/IntroScreen';

describe('IntroScreen', () => {
  const mockNavigation = {navigate: jest.fn()}; // Mock navigation object

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('navigates to LoginScreen when Skip is pressed', () => {
    const {getByText} = render(<IntroScreen navigation={mockNavigation} />);

    const skipButton = getByText('Skip');
    fireEvent.press(skipButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
  });

  test('renders correctly', () => {
    const tree = renderer
      .create(<IntroScreen navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
