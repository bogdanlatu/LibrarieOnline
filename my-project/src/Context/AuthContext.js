import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';

//by using createContext we get a provider and consumer
export const AuthContext = createContext();

export default ({ children })=>{
    //the user that is logged in
    const [user,setUser] = useState(null);
    //if this user is authenticated
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    //bool value to see if the app is loaded
    const [isLoaded,setIsLoaded] = useState(false);
    
    //React hook version of componentDidMount
    useEffect(()=>{
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[])
    
    
    //AuthContext.Provider provides the global state to the 'children' components
    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
    
}