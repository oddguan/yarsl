import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import AlertTitle from './alertTitle';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';

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
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType,
  });

  const handleCloseClick = (): void => {
    setOpen(false);
  };

  return (
    <Transition in={open} timeout={300} animation='zoom-in-top'>
      <div className={classes} {...restProps}>
        <div className='alert-content'>{children}</div>
        {!nonClosable && (
          <Icon
            data-testid='alert-close-btn'
            className='alert-close-btn'
            icon={faTimes}
            size='sm'
            onClick={handleCloseClick}
          />
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  alertType: 'default',
  nonClosable: false,
};

Alert.Title = AlertTitle;

export default Alert;
