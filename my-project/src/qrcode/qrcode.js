import React, {useState,useEffect} from 'react';
import './qrcode.css';
import QrReader from 'react-qr-reader';
import UserService from '../Services/UserService';

//Components
import BookItem from '../BookItem/BookItem';
import Message from '../Message/Message';


const QrCode = props => {
    
      //use these variables to get our books from database
  const [book,setBook] = useState();
  const [result,setResult] = useState(null);
  const [message,setMessage] = useState(null);
  
  let bookToRender;
 


    


  const handleScan = data => {
    if (data && (data !== result)) {
      setResult(data);
      UserService.getBook(data).then(data =>{
            //setBooks(data);
            
            console.log(data);
            setBook(data.book);
        });
    }
  }
  
  const handleError = err => {
    console.error(err)
  }
  
  
  
  if (book) {
      bookToRender = <BookItem book={book}/> 
  } else {
      bookToRender = <p>Please scan the QR code on the book</p>
  }
    
    
    const onClickHandler = () => {
        console.log(book);
        UserService.postBook(book).then(data => {
         setMessage(data.message);
         console.log(data); 
      });
    }
    

    return (
      <div className="qrcode-page">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ 
                width: '',
                'marginLeft': '0%',
                marginTop: '0%'
                }}
        />
        <p>{result}</p>
            
        <div className="qr-code-container">{bookToRender}</div>
            
        {message ? <Message message={message}/> : null}
            
        <button type="button" 
                className="btn btn-primary"
                style={{display : result ? "" : "none"}}
                onClick={onClickHandler}>Rent This Book</button>

            
      </div>
    );
}

export default QrCode;