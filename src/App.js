import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import Article from "./Article";
import NetworkStatusBanner from "./banner/NetworkStatusBanner";

const App = ({ initialData }) => {
  return (
    <>
      <NetworkStatusBanner />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/articles/:id">
          <Article initialData={initialData} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
