import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Article from './Article';

const App = ({initialData}) => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/articles/:id">
      <Article initialData={initialData} />
    </Route> 
  </Switch>
);

export default App;
