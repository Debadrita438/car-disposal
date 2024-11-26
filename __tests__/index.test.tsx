// import React from 'react';
// import {render, fireEvent} from '@testing-library/react-native';
// import Toast from 'react-native-toast-message';
// import App from '../src';

// // Mock the Toast module
// jest.mock('react-native-toast-message', () => ({
//   show: jest.fn(), // Mock show method
//   hide: jest.fn(), // Mock hide method (optional)
// }));

// describe('App Toast Tests', () => {
//   it('renders the Toast component', () => {
//     const {getByText} = render(<App />);

//     // Ensure the "Show Toast" button is rendered
//     const button = getByText('Show Toast');
//     expect(button).toBeTruthy();
//   });

//   it('calls Toast.show with the correct parameters when button is pressed', () => {
//     const {getByText} = render(<App />);

//     // Simulate a button press
//     const button = getByText('Show Toast');
//     fireEvent.press(button);

//     // Check if Toast.show was called with the correct arguments
//     expect(Toast.show).toHaveBeenCalledWith({
//       type: 'success',
//       text1: 'Hello',
//       text2: 'This is a test toast!',
//     });
//   });
// });
