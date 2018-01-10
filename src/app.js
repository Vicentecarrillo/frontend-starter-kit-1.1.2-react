/**
 * @overview Application entry point.
 */

// Global application styles
import 'src/app.scss';

// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// Our app
import App from './app/App';
import About from './app/about';
import Home from './app/home';
import Blogfeed from './app/blogfeed';
import Blogpost from './app/blogpost';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='about' component={About}/>
      <Route path='home' component={Home}/>
      <Route path='feed' component={Blogfeed}/>
      <Route path='posts/:slug' component={Blogpost}/>
      <Redirect from='*' to='/home'/>
    </Route>
  </Router>
), document.getElementById('root'));
