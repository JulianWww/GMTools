import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
//import {Header} from 'semantic-ui-react';
import './App.css';

import InitativeQueue from './components/InitativeQueue';
import Bartering from './components/Bartering'
import {urlBase} from "./const";
//const firebaseConfig = {
//  apiKey: 'AIzaSyA9EuEf7m3YOTBhBNhoe7DcOIZJP2toL6w',
//  authDomain: 'muncoordinated.firebaseapp.com',
//  databaseURL: 'https://muncoordinated.firebaseio.com',
//  projectId: 'muncoordinated',
//  storageBucket: 'muncoordinated.appspot.com',
//  messagingSenderId: '308589918735',
//  appId: "1:308589918735:web:f3567ce28d637eba40017a",
//  measurementId: "G-DPWPPBRD4M"
//};

//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={urlBase + "/"} component={InitativeQueue} />
        <Route exact path={urlBase + "/Bartering"} component={Bartering} />
      </Switch>
    );
  }
}

export default App;
