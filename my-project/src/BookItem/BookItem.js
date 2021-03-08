import React from 'react';
import './BookItem.css';

const getStyle = (props)=> {
    let baseClass = "dot-green";
    if(props.book.borrowedStatus == "borrowed")
        baseClass = "dot-red";
    
    return baseClass;
}


const BookItem = props =>{
    return (

        <div className="card book-item" style={{width: "18rem"}}>
            <img src={props.book.cover} className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title">{props.book.title}</h5>
            <p className="card-text">{props.book.author}</p>
            <div className="wrap">
            <p className="card-text status">Status: {props.book.borrowedStatus}</p>
            <span className={getStyle(props)}></span>
            </div>
            </div>
        </div>
    )
}

export default BookItem;