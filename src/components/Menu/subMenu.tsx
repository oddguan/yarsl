import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

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

  let timer: number;
  const handleHover = (e: React.MouseEvent, toggle: boolean): void => {
    window.clearTimeout(timer);
    e.preventDefault();
    timer = window.setTimeout(() => {
      setOpen(toggle);
    }, 300);
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
    return <ul className={subMenuClasses}>{mappedChildren}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
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
