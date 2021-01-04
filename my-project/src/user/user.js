import React, {useState,useContext,useEffect} from 'react';
import './user.css';
import UserService from '../Services/UserService';

//Components
import BookItem from '../BookItem/BookItem';
import LogoutButton from '../LogoutButton/LogoutButton';

const User = props => {
    
    //use these variables to get our books from database
    const [books,setBooks] = useState([]);

       
    //empty array as 2nd arg to force useEffect to execute once
    useEffect(()=>{
        UserService.getBooks().then(data =>{
            setBooks(data.books);
        });
    },[]);
    
    
    return(
    <div className="user-page">

    <p>This is the user page</p>

    <LogoutButton />

    <p>Borrowed books</p>

    <br/>

    <div className="row">
    <div className="col-sm-1"></div>
        {
            books.map(book =>{
                return (
                    <div className="col-sm-3">
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