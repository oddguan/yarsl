import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

describe('test Button Component', () => {
  it('should render default button and listen to onClick event', () => {
    const onClickMock = jest.fn();
    const propsWithOnClickMock: ButtonProps = {
      onClick: onClickMock,
    };
    const buttonText = 'Default Button';
    const { getByText } = render(<Button {...propsWithOnClickMock}>{buttonText}</Button>);
    const element = getByText(buttonText);

    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalled();
  });
});
