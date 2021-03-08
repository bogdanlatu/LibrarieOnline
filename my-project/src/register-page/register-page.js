//useRef to create an instance variable, we'll use setTimeout method
//useEffect to clean up what the setTimeout does
import React, {useState,useRef,useEffect} from 'react';
import './register-page.css';
import AuthService from '../Services/AuthService';
import Message from '../Message/Message';


const RegisterPage = props => {

    const [user,setUser] = useState({username : "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);
    
    //empty array as the 2nd argument so this only gets called once
    ////React hook version of componentDidUnMount
    useEffect(()=>{
        return()=>{
            clearTimeout(timerID);
        }
    },[]);
    
    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value});
    }
    
    const resetForm = () =>{
        setUser({username : "", password : "", role : ""});
    }
    
    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                //if there's no error, show the message to the user for 2s
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }
    
    return(
        <div className="login-page">
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                
                
                <input type="text" 
                        name="username"
                        value={user.username}
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Username"/>
                
                
                <input type="password" 
                        name="password"
                        value={user.password}
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter Password"/>
                
                
                <input type="text" 
                        name="role"
                        value={user.role}
                        onChange={onChange} 
                        className="form-control" 
                        placeholder="Enter role(admin/user)"/>
                
                <button className="btn btn-lg btn-primary" 
                        type="submit">Register</button>
                
            </form>     
            
            {message ? <Message message={message}/> : null}
            
        </div>
    );
}

export default RegisterPage;