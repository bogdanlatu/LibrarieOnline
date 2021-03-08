import React, {useState,useContext,useEffect} from 'react';
import './admin-page.css';
import { AuthContext } from '../Context/AuthContext';
import AdminService from '../Services/AdminService';

//Components
import Message from '../Message/Message';
import LogoutButton from '../LogoutButton/LogoutButton';
import AdminItem from '../AdminItem/AdminItem';

const AdminPage = props => {
    
    const authContext = useContext(AuthContext);
    const [book,setBook] = useState({bookID : "", cover : "", title : "", author : "", category : ""});
    //use these variables to get our books from database
    const [books,setBooks] = useState([]);
    const [message,setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [query, setQuery] = useState("");
    
    
    
    //empty array as 2nd arg to force useEffect to execute once
    useEffect(()=>{
        
        if(!query){
            setBooks([]);
            setPrevious(null);
            setNext(null);
        }
        AdminService.getBooks(currentPage,limit,query).then(data =>{
            setBooks(data.results);
            if(data.previous)
                setPrevious(data.previous.page);
            else
                setPrevious(null);
            if(data.next)
                setNext(data.next.page);
            else
                setNext(null);
                
        });
    },[currentPage,refresh,query]);
    
    console.log(previous,currentPage,next);
    
    const handler = () => {
        setRefresh(refresh+1);
    }
    
    const bookList = () => {
        const list = books.map(book =>
                <div key={book._id}>
                     
                    <AdminItem book={book} handler={handler}/>
                
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
                    setBooks(getData);
                    setMessage(message);
                    setTimeout(() => {setMessage(null)}, 2000);
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
        setBook({bookID : "", cover : "", title : "", author : "", category : ""});
    }
    
    const onClickPrevious = () => {
        setCurrentPage(previous);
    }
    
    const onClickNext = () => {
        
        setCurrentPage(next);
    }
    
    const onChangeQuery = e => {
        setQuery(e.target.value);
        console.log(query);
    }


    
    return(
        <div className="admin-page">

            <p>This is the admin page</p>
            
            <LogoutButton />
            
            <form onSubmit={onSubmit}>
                

                <input type="text" 
                        name="title" 
                        value={book.title} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Title"/>

                <input type="text" 
                        name="author" 
                        value={book.author} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Author"/>
                

                <input type="text" 
                        name="cover" 
                        value={book.cover} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Cover"/>
                
                <input type="text" 
                        name="bookID" 
                        value={book.bookID} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Book ID"/>
                
                <input type="text" 
                        name="category" 
                        value={book.category} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter Category"/>
                
                <button className="btn btn-primary" 
                        type="submit">Submit</button>
            </form>
            
            {message ? <Message message={message}/> : null}
                
            <br/>
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="active-cyan-3 active-cyan-4 mb-4">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={onChangeQuery}></input>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
            
            <br/>
            
            

            
            {bookList()}
            
            <nav>
                <ul className="pagination justify-content-center">
                <li className="page-item">
                <a className="page-link " 
                    onClick={onClickPrevious}
                    style={{display : previous ? "" : "none"}}
                    ><i className="fa fa-arrow-circle-left"></i></a>
                </li>

                <li className="page-item">
                <a className="page-link" onClick={onClickNext}
                style={{display : next ? "" : "none"}}    
                    ><i className="fa fa-arrow-circle-right"></i></a>
                </li>
                </ul>
            </nav>
               
        </div>
    );
}

export default AdminPage;