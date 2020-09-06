import React, { useContext } from 'react';
import classNames from 'classnames';

import { TabsContext } from './tabs';

export interface TabsPaneProps {
  index?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TabsPane: React.FC<TabsPaneProps> = ({
  index,
  label,
  disabled,
  className,
  style,
  children,
}: React.PropsWithChildren<TabsPaneProps>) => {
  const tabsContext = useContext(TabsContext);

  const classes = classNames('tabs-pane', className, {
    'is-disabled': disabled,
  });

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (tabsContext.onSelect && typeof index === 'string') {
      tabsContext.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style}>
      <div className='pane-label' onClick={handleClick}>
        {label}
      </div>
      <div className='pane-body'>{children}</div>
    </li>
  );
};

TabsPane.displayName = 'TabsPane';

export default TabsPane;
