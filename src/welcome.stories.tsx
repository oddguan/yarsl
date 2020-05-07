import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome Page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>Welcome to yarsl!</h1>
        <h3>Installation</h3>
        <code>npm install --save yarsl</code>
      </>
    );
  },
  { info: { disable: true } },
);
