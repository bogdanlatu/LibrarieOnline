import React from 'react';

const BookItem = props =>{
    return (

        <div className="card" style={{width: "18rem"}}>
            <img src={props.book.cover} className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title">{props.book.title}</h5>
            <p className="card-text">{props.book.author}</p>
            </div>
        </div>
    )
}

export default BookItem;