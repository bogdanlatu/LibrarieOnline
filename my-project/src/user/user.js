import React, {useState,useContext,useEffect} from 'react';
import './user.css';
import UserService from '../Services/UserService';
import { AuthContext } from '../Context/AuthContext';

//Components
import BookItem from '../BookItem/BookItem';
import LogoutButton from '../LogoutButton/LogoutButton';

const User = props => {
    
    //use these variables to get our books from database
    const [books,setBooks] = useState([]);
    const {user} = useContext(AuthContext);

       
    //empty array as 2nd arg to force useEffect to execute once
    useEffect(()=>{
        UserService.getBooks().then(data =>{
            setBooks(data.books);
        });
    },[]);
    
    
    return(
    <div className="user-page">

    <h2>Hello {user.username}</h2>

    <LogoutButton />

    <p>Borrowed books</p>

    <br/>

    <div className="row">
    
        {
            books.map(book =>{
                return (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <BookItem key={book._id} book={book}/>
                    </div>
                )
            })
        }
    </div>

    </div>
    );
}

export default User;