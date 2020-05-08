import React from 'react';

const AlertTitle: React.FC = (props: React.PropsWithChildren<{}>): React.ReactElement => {
  const { children } = props;
  return <div className='alert-title'>{children}</div>;
};

export default AlertTitle;
