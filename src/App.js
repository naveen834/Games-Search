import React, { Suspense } from 'react';
//Components and pages
//Styles
import GlobalStyles from './components/GlobalStyles';
//Router
import { Route } from 'react-router-dom';
import Nav from './components/Nav';
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Route path={['/game/:id', '/']}>
        <Nav />
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            <Home />
          </section>
        </Suspense>
      </Route>
    </div>
  );
}

export default App;
