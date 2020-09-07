import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition';
import Button from './components/Button/button';
library.add(fas);

function App(): React.ReactElement {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={(): void => setShow(!show)}>button1</Button>
      <Transition in={show} animation='zoom-in-top' timeout={300}>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ratione doloribus nemo veniam adipisci quos
            voluptas quo, repudiandae assumenda provident suscipit omnis, quis veritatis. Eligendi culpa quae voluptate
            ducimus inventore.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ratione doloribus nemo veniam adipisci quos
            voluptas quo, repudiandae assumenda provident suscipit omnis, quis veritatis. Eligendi culpa quae voluptate
            ducimus inventore.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ratione doloribus nemo veniam adipisci quos
            voluptas quo, repudiandae assumenda provident suscipit omnis, quis veritatis. Eligendi culpa quae voluptate
            ducimus inventore.
          </p>
          <Button>test button</Button>
        </div>
      </Transition>
    </>
  );
}

export default App;
