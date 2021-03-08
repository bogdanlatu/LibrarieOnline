import React, {useState, useEffect} from 'react';
import './search.css';
import UserService from '../Services/UserService';

//Components
import BookItem from '../BookItem/BookItem';


const Search = props => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    
    
    const onChange = e => {
        setQuery(e.target.value);
        
    }
    
    useEffect(()=>{
        if(!query){
            setBooks([]);
            setPrevious(null);
            setNext(null);
        }
        
        UserService.getResults(currentPage,limit,query).then(data => {
            setBooks(data.results);
            if(data.previous)
                setPrevious(data.previous.page);
            else
                setPrevious(null);
            if(data.next)
                setNext(data.next.page);
            else
                setNext(null);
            console.log(data);
        });
        
    },[currentPage,query]);
    
    const bookList = () => {
        if(books){
            const list = books.map(book =>
                <div className="col-lg-4" key={book._id}>
                     
                    <BookItem book={book}/>
                
                </div>            
            );
                                   
            return list;
        }
    }
                                   
      
    const onClickPrevious = () => {
        setCurrentPage(previous);
    }

    const onClickNext = () => {

        setCurrentPage(next);
    }
    

    return(
        <div className="search-page">
            
         <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="active-cyan-3 active-cyan-4 mb-4">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={onChange}></input>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
            
            <div className="row">
                 {bookList()}                      
            </div>
            
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
    )
}

export default Search;