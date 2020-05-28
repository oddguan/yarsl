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
    const element = getByText(buttonText) as HTMLButtonElement;

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('BUTTON');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalled();
    expect(element).toHaveClass('btn btn-primary');
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
    expect(element.tagName).toBe('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render a disabled button', () => {
    const buttonText = 'Disabled Button';
    const disabledButtonProps: ButtonProps = {
      disabled: true,
      onClick: jest.fn(),
    };
    const { getByText } = render(<Button {...disabledButtonProps}>{buttonText}</Button>);
    const element = getByText(buttonText) as HTMLButtonElement;

    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledButtonProps.onClick).not.toHaveBeenCalled();
  });

  it('should render a disabled link button', () => {
    const linkText = 'Disabled Link Button';
    const disabledLinkButtonProps: ButtonProps = {
      disabled: true,
      onClick: jest.fn(),
      href: 'http://example.com',
      btnType: ButtonType.Link,
    };
    const { getByText } = render(<Button {...disabledLinkButtonProps}>{linkText}</Button>);
    const element = getByText(linkText);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-link disabled');
  });
});
