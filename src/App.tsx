import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';

function App(): React.ReactElement {
  return (
    <>
      <div style={{ width: '700px' }}>
        <Alert>This is a default alert</Alert>
        <br />
        <Alert alertType={AlertType.Danger} nonClosable>
          This is a danger alert and cannot be closed
        </Alert>
        <br />
        <Alert alertType={AlertType.Warning}>
          <Alert.Title>Warning Title</Alert.Title>
          <span>This is the warning alert content. Hello World!</span>
          <br />
          <span>Hello from another paragraph.</span>
        </Alert>
        <br />
        <Alert alertType={AlertType.Success}>
          <Alert.Title>The action was successful!</Alert.Title>
          <span>Your action was successfully received. Clicked the close button to close this alert.</span>
        </Alert>
      </div>
    </>
  );
}

export default App;
