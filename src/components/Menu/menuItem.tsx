import React, { useContext } from 'react';
import classNames from 'classnames';

import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  style,
  children,
}: React.PropsWithChildren<MenuItemProps>) => {
  const context = useContext(MenuContext);

  const handleClick = (): void => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  };

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
