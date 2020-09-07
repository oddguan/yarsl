import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-right' | 'zoom-in-left';

export type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition: React.FC<TransitionProps> = (props: React.PropsWithChildren<TransitionProps>): React.ReactElement => {
  const { children, classNames, animation, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
