import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it('should close the alert box when close button was clicked', () => {
    const alertText = 'default alert';
    const { getByText, container } = render(<Alert>{alertText}</Alert>);
    const closeButton = getByText('close');
    fireEvent.click(closeButton);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="alert-hidden"
      >
        <div
          class="alert-content"
        >
          ${alertText}
        </div>
        <span
          class="alert-close-btn"
        >
          close
        </span>
      </div>
    `);
  });
});
