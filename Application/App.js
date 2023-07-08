import React from 'react';
import AppNavigator from './src/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default App;
