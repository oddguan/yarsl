import React, { useState, createContext } from 'react';
import classNames from 'classnames';

import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu from './subMenu';

export type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface MenuContextProps {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<MenuContextProps>({ index: '0' });

interface MenuComponent<P = {}> extends React.FC<P> {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
}

const Menu: MenuComponent<MenuProps> = ({
  className,
  mode,
  style,
  defaultIndex,
  children,
  onSelect,
}: React.PropsWithChildren<MenuProps>) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const handleClick = (index: string): void => {
    setCurrentActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: MenuContextProps = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
  };

  const classes = classNames('yarsl-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const renderChildren = (): React.FunctionComponentElement<MenuItemProps>[] | null | undefined => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName !== 'MenuItem' && displayName !== 'SubMenu') {
        console.error('Error: Menu has a child which is not a MenuItem component.');
        return null;
      } else {
        return React.cloneElement(childElement, { index: index.toString() });
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid='yarsl-menu'>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
