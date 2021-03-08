import React, {useContext} from 'react';
import './nav-bar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


const NavBar = props => {
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/qrcode"><i className="fa fa-qrcode fa-fw"></i></Link>
                <Link to="/user"><i className="fa fa-user fa-fw"></i></Link>
            </>
        )
    }
    
    const authenticatedNavBar = () => {
        return (
            <>
            {
                    user.role === "user" ?
                    <Link to="/qrcode"><i className="fa fa-qrcode fa-fw"></i></Link> : null
            
                }    
            
            {
                    user.role === "user" ?
                    <Link to="/user"><i className="fa fa-user fa-fw"></i></Link> : null
                }
            
                
                {
                    user.role === "admin" ?
                    <Link to="/qrcode-admin"><i className="fa fa-qrcode fa-fw"></i></Link> : null
            
                }
                {
                    user.role === "admin" ?
                    <Link to="/admin"><i className="fa fa-cog fa-fw"></i></Link> : null
                }
                
            </>
        )
    }
      
    return(
        <div className="nav-bar">
            <div className="nav-bar-items">
                
                <Link to="/"><i className="fa fa-home fa-fw"></i></Link>
                <Link to="/search"><i className="fa fa-search fa-fw"></i></Link>
                
                
                { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                
                {/*<Link to="/"><i className="fa fa-home fa-fw"></i></Link>
                <Link to="/search"><i className="fa fa-search fa-fw"></i></Link>
                <Link to="/qrcode"><i className="fa fa-qrcode fa-fw"></i></Link>
                <Link to="/user"><i className="fa fa-user fa-fw"></i></Link>*/}
            </div>
        </div>
    );
}

export default NavBar;