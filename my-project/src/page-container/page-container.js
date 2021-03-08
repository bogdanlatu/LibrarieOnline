import React, {Component} from 'react';
import './page-container.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//Components
import Home from '../home/home';
import Search from '../search/search';
import QrCode from '../qrcode/qrcode';
import QrCodeAdmin from '../qrcode-admin/qrcode-admin';
import UserPage from '../user/user';
import LoginPage from '../login-page/login-page';
import RegisterPage from '../register-page/register-page';
import AdminPage from '../admin-page/admin-page';
import PrivateRoute from '../hocs/PrivateRoute';
import UnPrivateRoute from '../hocs/UnPrivateRoute';


class PageContainer extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className="wrapper">
                
                <TransitionGroup className="transition-group">
                <CSSTransition
                key={this.props.location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames={'fade'}
                >
                
                    <section className="route-section">
                    <Switch location={this.props.location}>
                        <Route exact path="/" component={Home} />
                        <Route path="/search" component={Search} />
                        <PrivateRoute path="/qrcode" roles={["user","admin"]} component={QrCode} />
                        <PrivateRoute path="/user" roles={["user","admin"]} component={UserPage} />
                        <UnPrivateRoute path="/login" component={LoginPage} />
                        <UnPrivateRoute path="/register" component={RegisterPage} />
                        <PrivateRoute path="/admin" roles={["admin"]} component={AdminPage} />
                        <PrivateRoute path="/qrcode-admin" roles={["admin"]} component={QrCodeAdmin} />
                    </Switch>
                    </section>
                    
                </CSSTransition>
                </TransitionGroup>
                    
            </div>
        );
    }
}

export default withRouter (PageContainer);