import React from 'react';
//Components and pages
//Styles
import GlobalStyles from './components/GlobalStyles';
//Router
import { Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Route path={['/game/:id', '/']}>
        <Nav />
        <Home />
      </Route>
    </div>
  );
}

export default App;
