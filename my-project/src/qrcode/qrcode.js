import React, {useState,useEffect} from 'react';
import './qrcode.css';
import QrReader from 'react-qr-reader';
import AdminService from '../Services/AdminService';
import UserService from '../Services/UserService';

//Components
import BookItem from '../BookItem/BookItem';
import Message from '../Message/Message';


const QrCode = props => {
    
      //use these variables to get our books from database
  const [books,setBooks] = useState([]);
  const [result,setResult] = useState("No result");
  const [message,setMessage] = useState(null);

    
  useEffect(()=>{
        AdminService.getBooks().then(data =>{
            setBooks(data);
        });
    },[]);
    

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }
  
  const handleError = err => {
    console.error(err)
  }
  
  
  
  let booksToRender;
  let bookToSave;
    
  const saveBook = () => {
      UserService.postBook(bookToSave).then(data => {
         console.log(data); 
      });
      
  }
    
  if (books) {
    booksToRender = books.map(book => {
        if(book._id === result){
       bookToSave = book;
       saveBook();
       return (<BookItem key={book._id} book={book}/>)}
    });  
  } else {
      booksToRender = "Loading...";
  }
    
    
    

    return (
      <div className="qrcode-page">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ 
                width: '20%',
                'marginLeft': '35%',
                marginTop: '0%'
                }}
        />
        <p>{result}</p>
            
        <div>{booksToRender}</div>
            
      </div>
    );
}

export default QrCode;