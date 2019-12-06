import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import ScrollToTop from './helpers/scrollToTop';
import { Provider } from 'react-redux';
import Navbar from './components/layout/navbar';
import ProductList from './components/product/productList';
import ProductDetails from './components/product/productDetails';
import Login from './components/security/login';
import Register from './components/security/register';
// import Profile from './components/user/profile';
import store from './store';
import { loadUser } from './actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

require('../css/app.css');

class App extends React.Component 
{
    render() {
        return (
            <Provider store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)}>
                <span>
                    <span id="react-header">
                        <Navbar/>
                    </span>
                    <div id="page-container">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                            <ScrollToTop>
                                <Switch>
                                    <Route path='/' exact component={ProductList} />
                                    <Route path='/show/:id' component={ProductDetails} />
                                    <Route path='/login' component={Login} />
                                    <Route path='/register' component={Register} />
                                    <Route path="*" render={() => (<Redirect to="/" />)} /> 
                                </Switch>
                            </ScrollToTop>
                    </div>
                </span>
                </Router>
            </Provider>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });
  
  export default connect( mapStateToProps)(App);

  ReactDOM.render(<App/>, document.getElementById("root"));

