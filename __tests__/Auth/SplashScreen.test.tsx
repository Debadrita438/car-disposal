import React from 'react';
import {render, act} from '@testing-library/react-native';
import SplashScreen from '../../src/screens/AuthScreens/SplashScreen';
import renderer from 'react-test-renderer';
import {storage} from '../../src/utils/Storage';

// Mock the navigation prop
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    replace: jest.fn(),
  }),
}));

// Mock the storage module (MMKV)
jest.mock('../../src/utils/Storage', () => ({
  storage: {
    contains: jest.fn(),
  },
}));

describe('SplashScreen', () => {
  const mockNavigation = {replace: jest.fn()};

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('navigates to AppScreen if the token exists', () => {
    // Mock storage.contains to return true (simulate token exists)
    (storage.contains as jest.Mock).mockReturnValue(true);

    jest.useFakeTimers(); // Mock timers
    render(<SplashScreen navigation={mockNavigation} />);

    // Fast-forward until all timers have been executed
    act(() => {
      jest.runAllTimers();
    });

    expect(mockNavigation.replace).toHaveBeenCalledWith('AppScreen');
  });

  it('navigates to IntroScreen if the token does not exist', () => {
    // Mock storage.contains to return false (simulate no token)
    (storage.contains as jest.Mock).mockReturnValue(false);

    jest.useFakeTimers();
    render(<SplashScreen navigation={mockNavigation} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(mockNavigation.replace).toHaveBeenCalledWith('IntroScreen');
  });

  it('renders the splash screen image', () => {
    const {getByTestId} = render(<SplashScreen navigation={mockNavigation} />);
    const splashImage = getByTestId('splash-image'); // Ensure testID is added to the Image component

    expect(splashImage).toBeTruthy();
  });
});

test('renders correctly', () => {
  const mockNavigation = {replace: jest.fn()};
  const tree = renderer
    .create(<SplashScreen navigation={mockNavigation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
