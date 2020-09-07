import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Alert from './components/Alert/alert';
library.add(fas);

function App(): React.ReactElement {
  return (
    <>
      <Alert alertType='danger'>This is a danger alert</Alert>
    </>
  );
}

export default App;
