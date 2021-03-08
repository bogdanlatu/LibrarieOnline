import React, {useContext} from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import './LogoutButton.css';


const LogoutButton = props =>{
    const {setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const history = useHistory();
    
    const onClickLogoutHandler = () => {
        AuthService.logout().then(data=>{
           if(data.success){
               setUser(data.user);
               setIsAuthenticated(false);
               history.push('/login');
           } 
        });
    }
    
    return(
        <button type="button" 
                className="btn btn-danger custom" 
                onClick={onClickLogoutHandler}>Logout</button>
    )
}

export default LogoutButton;