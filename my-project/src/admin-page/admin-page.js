import React, {useState,useContext,useEffect} from 'react';
import './admin-page.css';
import { AuthContext } from '../Context/AuthContext';
import AdminService from '../Services/AdminService';

//Components
import BookItem from '../BookItem/BookItem';
import Message from '../Message/Message';
import LogoutButton from '../LogoutButton/LogoutButton';

const AdminPage = props => {
    
    const authContext = useContext(AuthContext);
    const [book,setBook] = useState({title : "", author : "", cover : ""});
    //use these variables to get our books from database
    const [books,setBooks] = useState([]);
    const [message,setMessage] = useState(null);
    
    
    //empty array as 2nd arg to force useEffect to execute once
    useEffect(()=>{
        AdminService.getBooks().then(data =>{
            setBooks(data);
        });
    },[]);
    
    const bookList = () => {
        const list = books.map(book =>
                <div className="col-sm-4" key={book._id}>
                     
                    <BookItem book={book}/>
                
                </div>
                       
                    );
        
        
        return list;
    }
    
    const onSubmit = e => {
        e.preventDefault();
        AdminService.postBook(book).then(data =>{
            const { message } = data;
            resetForm();
            if(!message.msgError){
                AdminService.getBooks().then(getData =>{
                    setBooks(getData.books);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "Unauthorized"){
                setMessage(message);
                authContext.setUser({username : "", role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }
    
    const onChange = e =>{
        setBook({...book,[e.target.name] : e.target.value});
    }
    
    const resetForm = ()=>{
        setBook({title : "", author : "", cover : ""});
    }
    


    
    return(
        <div className="admin-page">

            <p>This is the admin page</p>
            
            <form onSubmit={onSubmit}>
                
                <label htmlFor="title">Enter Title</label>
                <input type="text" 
                        name="title" 
                        value={book.title} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Title"/>
                
                <label htmlFor="author">Enter Author</label>
                <input type="text" 
                        name="author" 
                        value={book.author} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Author"/>
                
                <label htmlFor="cover">Enter Cover</label>
                <input type="text" 
                        name="cover" 
                        value={book.cover} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Cover"/>
                
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Submit</button>
            </form>
            
            {message ? <Message message={message}/> : null}
                
            <LogoutButton />
            
            <br/>
            
            <ul className="list-group">
                {
                   bookList()
                }
            </ul>  

        </div>
    );
}

export default AdminPage;