import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert from './alert';

describe('test Alert Component', () => {
  it('should render a default alert box', () => {
    const alertText = 'This is a default alert';
    const { getByText, getByTestId } = render(<Alert>{alertText}</Alert>);
    const content = getByText(alertText);
    const closeButton = getByTestId('alert-close-btn');

    expect(content).toBeInTheDocument();
    expect(content.classList.contains('alert-content')).toBeTruthy();
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.classList.contains('alert-close-btn')).toBeTruthy();
  });

  it('should close the alert box when close button was clicked', (done) => {
    const alertText = 'default alert';
    const { getByTestId, getByText } = render(<Alert>{alertText}</Alert>);
    const closeButton = getByTestId('alert-close-btn');
    const alertBox = getByText(alertText);
    expect(alertBox).toBeInTheDocument();
    fireEvent.click(closeButton);
    setTimeout(() => {
      expect(alertBox).not.toBeInTheDocument();
      done();
    }, 300);
  });
});
