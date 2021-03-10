import React from 'react';
import { WebsocketProvider } from './contexts/WebsocketProvider';

import GameLanding from './components/GameLanding';


const App = () => {
  return (
    <WebsocketProvider>
      <GameLanding />
    </WebsocketProvider>
  );
}

export default App;
