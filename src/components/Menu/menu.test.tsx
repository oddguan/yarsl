import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Menu from './menu';

jest.useFakeTimers();

describe('test Menu component', () => {
  it('should render a default (horizontal) Menu component with 3 MenuItems', () => {
    const { getByText, getByTestId } = render(
      <Menu>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item>item2</Menu.Item>
        <Menu.Item>item3</Menu.Item>
      </Menu>,
    );

    const parentMenuElement = getByTestId('yarsl-menu');
    expect(parentMenuElement).toBeInTheDocument();
    expect(parentMenuElement).toHaveClass('yarsl-menu menu-horizontal');

    for (let i = 1; i <= 3; ++i) {
      const testText = `item${i}`;
      const element = getByText(testText);

      expect(element).toBeInTheDocument();
      if (i === 1) {
        expect(element).toHaveClass('is-active');
      }
    }
  });

  it('should render a vertical Menu component with 2 regular MenuItems and a SubMenu with another 2 MenuItems', () => {
    const { getByText, getByTestId } = render(
      <Menu mode='vertical'>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item disabled>item2</Menu.Item>
        <Menu.SubMenu title='submenu1'>
          <Menu.Item>item3</Menu.Item>
          <Menu.Item>item4</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    );

    const parentMenuElement = getByTestId('yarsl-menu');
    expect(parentMenuElement).toBeInTheDocument();
    expect(parentMenuElement).toHaveClass('yarsl-menu menu-vertical');

    for (let i = 1; i <= 2; ++i) {
      const firstLevelElement = getByText(`item${i}`);
      expect(firstLevelElement).toBeInTheDocument();
      expect(firstLevelElement).toHaveClass('menu-item');
      if (i === 2) {
        expect(firstLevelElement).toHaveClass('is-disabled');
      }
    }

    const submenuElement = getByText('submenu1');
    expect(submenuElement).toBeInTheDocument();
    expect(submenuElement).toHaveClass('submenu-title');
  });

  it('should render a default horizontal menu with two MenuItems, without rendering a div tag, and console.error should warn', () => {
    const consoleErrorMock = jest.fn();
    console.error = consoleErrorMock;
    const { queryByText } = render(
      <Menu>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item>item2</Menu.Item>
        <div>item3</div>
      </Menu>,
    );

    for (let i = 1; i <= 3; ++i) {
      const element = queryByText(`item${i}`);
      if (i !== 3) {
        expect(element).toBeInTheDocument();
      } else {
        expect(element).not.toBeInTheDocument();
      }
    }
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock).toHaveBeenCalledWith('Error: Menu has a child which is not a MenuItem component.');
  });

  it('should correctly handle switching tabs and call the onSelect callback with the correct index passed in', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <Menu onSelect={onSelectMock}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item>item2</Menu.Item>
      </Menu>,
    );

    const item1 = getByText('item1');
    const item2 = getByText('item2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item1).toHaveClass('is-active');

    fireEvent.click(item2);

    expect(item2).toHaveClass('is-active');
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('1');
  });

  it('should listen to hover event when menu has a submenu in horizontal mode', () => {
    const { queryByText, getByTestId } = render(
      <Menu mode='horizontal'>
        <Menu.Item>item1</Menu.Item>
        <Menu.SubMenu title='submenu'>
          <Menu.Item>item2-1</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    );
    const item1 = queryByText('item1');
    expect(item1).toBeInTheDocument();

    const submenu = getByTestId('yarsl-submenu');
    expect(submenu).not.toHaveClass('menu-opened');
    fireEvent.mouseEnter(submenu);
    jest.runAllTimers();
    expect(submenu).toHaveClass('menu-opened');
    fireEvent.mouseLeave(submenu);
    jest.runAllTimers();
    expect(submenu).not.toHaveClass('menu-opened');
  });

  it('should listen to click event if the menu is vertical when submenu is clicked', () => {
    const { getByText, getByTestId } = render(
      <Menu mode='vertical'>
        <Menu.SubMenu title='submenu'>
          <Menu.Item>item1</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    );
    const submenuTitle = getByText('submenu');
    const submenuParent = getByTestId('yarsl-submenu');
    fireEvent.click(submenuTitle);
    expect(submenuParent).toBeInTheDocument();
    expect(submenuParent).toHaveClass('menu-opened');
  });

  it('should console.error if the submenu contains elements other than Menu.Item', () => {
    const consoleErrorMock = jest.fn();
    console.error = consoleErrorMock;

    const { queryByText } = render(
      <Menu>
        <Menu.SubMenu title='submenu'>
          <div>item1</div>
        </Menu.SubMenu>
      </Menu>,
    );

    const item1 = queryByText('item1');
    expect(item1).not.toBeInTheDocument();
    expect(consoleErrorMock).toBeCalledTimes(1);
    expect(consoleErrorMock).toBeCalledWith('Error: SubMenu has a child which is not a MenuItem component.');
  });
});
