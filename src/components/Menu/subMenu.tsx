import React, { useContext, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  defaultOpen?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  defaultOpen,
  className,
  children,
}: React.PropsWithChildren<SubMenuProps>) => {
  const menuContext = useContext(MenuContext);

  const [open, setOpen] = useState(menuContext.mode === 'vertical' && defaultOpen);

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleHover = (e: React.MouseEvent, toggle: boolean): void => {
    e.preventDefault();
    setOpen(toggle);
  };

  const clickEvents = menuContext.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvents =
    menuContext.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent): void => handleHover(e, true),
          onMouseLeave: (e: React.MouseEvent): void => handleHover(e, false),
        }
      : {};

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === menuContext.index,
    'is-opened': open,
    'is-vertical': menuContext.mode === 'vertical',
  });

  const renderChildren = (): React.ReactElement => {
    const subMenuClasses = classNames('yarsl-submenu', {
      'menu-opened': open,
    });
    const mappedChildren = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error('Error: SubMenu has a child which is not a MenuItem component.');
      }
    });
    return (
      <Transition in={open} timeout={300} animation='zoom-in-top'>
        <ul className={subMenuClasses} data-testid='yarsl-submenu'>
          {mappedChildren}
        </ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon={faAngleDown} className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

SubMenu.defaultProps = {
  defaultOpen: false,
};

export default SubMenu;
