import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Car from './components/car/Car';
import Create from './components/car/Create';
import Edit from './components/car/Edit';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <div className={'container'}>
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/car/:carId"} component={Car} />
          <Route path={"/edit/:carId"} component={Edit} />
          <Route path={"/create"} component={Create} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
