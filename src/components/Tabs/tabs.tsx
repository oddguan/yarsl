import React, { createContext, useState } from 'react';
import classNames from 'classnames';

import TabsPane, { TabsPaneProps } from './tabsPane';

type SelectCallback = (index: string) => void;

type TabsType = 'default' | 'card';

export interface TabsProps {
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  type?: TabsType;
}

export interface TabsContextProps {
  index: string;
  onSelect?: SelectCallback;
}

export const TabsContext = createContext<TabsContextProps>({ index: '0' });

interface TabsComponent<P = {}> extends React.FC<P> {
  Pane: typeof TabsPane;
}

const Tabs: TabsComponent<TabsProps> = ({
  defaultIndex,
  className,
  style,
  onSelect,
  children,
}: React.PropsWithChildren<TabsProps>) => {
  const classes = classNames('yarsl-tabs', className);

  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const handleClick = (index: string): void => {
    setCurrentActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: TabsContextProps = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
  };

  const renderChildren = (): React.FunctionComponentElement<TabsPaneProps>[] | null | undefined => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<TabsPaneProps>;
      const { displayName } = childElement.type;
      if (displayName === 'TabsPane') {
        return React.cloneElement(childElement, { index: i.toString() });
      } else {
        console.error('Error: Tabs component has a child which is not a Tabs.Pane component.');
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <TabsContext.Provider value={passedContext}>{renderChildren()}</TabsContext.Provider>
    </ul>
  );
};

Tabs.Pane = TabsPane;

Tabs.defaultProps = {
  defaultIndex: '0',
};

export default Tabs;
