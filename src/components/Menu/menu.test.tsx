import React from 'react';
import { render } from '@testing-library/react';

import Menu from './menu';

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
});
