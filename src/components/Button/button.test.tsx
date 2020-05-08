import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonType } from './button';

describe('test Button Component', () => {
  it('should render default primary button and listen to onClick event', () => {
    const onClickMock = jest.fn();
    const propsWithOnClickMock: ButtonProps = {
      onClick: onClickMock,
      btnType: ButtonType.Primary,
    };
    const buttonText = 'Default Button';
    const { getByText } = render(<Button {...propsWithOnClickMock}>{buttonText}</Button>);
    const element = getByText(buttonText);

    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalled();
    expect(element.classList.contains('btn')).toBeTruthy();
    expect(element.classList.contains('btn-primary')).toBeTruthy();
  });

  it('should render link button using anchor tag', () => {
    const buttonText = 'Link Button';
    const { getByText } = render(
      <Button btnType={ButtonType.Link} href='https://google.com/'>
        {buttonText}
      </Button>,
    );
    const element = getByText(buttonText);

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('a'.toUpperCase());
    expect(element.classList.contains('btn')).toBeTruthy();
    expect(element.classList.contains('btn-link')).toBeTruthy();
  });
});
