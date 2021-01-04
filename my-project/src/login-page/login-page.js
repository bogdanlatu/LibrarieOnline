import React, {useState,useContext} from 'react';
import './login-page.css';
import AuthService from '../Services/AuthService';
import Message from '../Message/Message';
import {AuthContext} from '../Context/AuthContext';
import { Link } from 'react-router-dom';



const LoginPage = props => {

    const [user,setUser] = useState({username : "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value});
    }
    
    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const { isAuthenticated,user,message } = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                
                if(user.role === "user")
                    props.history.push('/user');
                if(user.role === "admin")
                    props.history.push('/admin');
            }
            else
                setMessage(message);
        });
    }
    
    return(
        <div className="login-page">
            <form onSubmit={onSubmit}>
                <h3>Please sign in</h3>
                
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                        name="username" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Username"/>
                
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                        name="password" 
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Password"/>
                
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Log in</button>
                
            </form>
            
            <p>If you don't have an account click <Link to="/register">here</Link></p>
            
            {message ? <Message message={message}/> : null}
            
        </div>
    );
}

export default LoginPage;