import React from 'react';
import { render } from '@testing-library/react';
import Alert from './alert';

describe('test Alert Component', () => {
  it('should render a default alert box', () => {
    const alertText = 'This is a default alert';
    const { getByText } = render(<Alert>{alertText}</Alert>);
    const content = getByText(alertText);
    const closeButton = getByText('close');

    expect(content).toBeInTheDocument();
    expect(content.classList.contains('alert-content')).toBeTruthy();
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.classList.contains('alert-close-btn')).toBeTruthy();
  });
});
