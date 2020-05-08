import React, { useState } from 'react';
import classNames from 'classnames';
import AlertTitle from './alertTitle';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

export interface BaseAlertProps {
  alertType?: AlertType;
  nonClosable?: boolean;
}

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>;

interface AlertComponent<P = {}> extends React.FC<P> {
  Title: typeof AlertTitle;
}

const Alert: AlertComponent<AlertProps> = (props: AlertProps): React.ReactElement => {
  const { nonClosable, alertType, className, children, ...restProps } = props;

  // a boolean state indicating whether the alert box is open
  const [open, setOpen] = useState(true);
  // classes when alert box is open
  const openClasses = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
  });
  // classes when alert box is closed
  const closeClasses = 'alert-hidden';

  const handleCloseClick = (): void => {
    setOpen(false);
  };

  return (
    <div className={open ? openClasses : closeClasses} {...restProps}>
      <div className='alert-content'>{children}</div>
      {!nonClosable && (
        <span onClick={handleCloseClick} className='alert-close-btn'>
          close
        </span>
      )}
    </div>
  );
};

Alert.defaultProps = {
  alertType: AlertType.Default,
  nonClosable: false,
};

Alert.Title = AlertTitle;

export default Alert;
