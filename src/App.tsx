import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

function App(): React.ReactElement {
  return (
    <>
      <Button>Regular Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary Button
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Small Danger Button
      </Button>
      <Button btnType={ButtonType.Link} href='https://google.com'>
        Google Link
      </Button>
      <Button btnType={ButtonType.Link} disabled href='https://google.com'>
        Disabled Google Link
      </Button>
      <Button disabled>Disabled Button</Button>
    </>
  );
}

export default App;
