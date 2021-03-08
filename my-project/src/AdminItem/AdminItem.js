import React, {useState} from 'react';
import './AdminItem.css';
import AdminService from '../Services/AdminService';
import QRCode from 'qrcode.react';

const AdminItem = props =>{
    
    const [book, setBook] = useState({title : props.book.title, author : props.book.author, cover : props.book.cover, category : props.book.category});
    const [handler, setHandler] = useState(props.handler);
    const [isDisabled, setIsDisabled] = useState(true);

    
    
    const onClickRemove = () => {
        AdminService.deleteBook(props.book._id).then(data => {
           console.log(data);
           props.handler();
        });
        
    }
    
    const onClickDisable = () => {
        setIsDisabled(false);
    }
    
    const onChange = e => {
        setBook({...book,[e.target.name] : e.target.value});
    }
    
    const onClickSave = () => {
        AdminService.modifyBook(book,props.book._id).then(data => {
           console.log(data);
           props.handler();
        });
        setIsDisabled(true);
    }
    
    const onClickEnable = () => {
        setIsDisabled(true);
        setBook({title : props.book.title, author : props.book.author, cover : props.book.cover});
    }

    
    return (

        <div className="admin-item ">
            <ul className="list-group list-group-horizontal ">
            <li className="list-group-item"><img src={book.cover}/></li>
            <li className="list-group-item">
                <textarea cols="20"
                   rows="3 "
                   name="title"
                   value={book.title}
                   onChange={onChange}
                   disabled={isDisabled}/>
            </li>
            <li className="list-group-item">
                <textarea cols="20"
                   rows="3 "
                   name="author"
                   value={book.author}
                   onChange={onChange}
                   disabled={isDisabled}/>
            </li>
            <li className="list-group-item">
                <textarea cols="20"
                   rows="3 "
                   name="category"
                   value={book.category}
                   onChange={onChange}
                   disabled={isDisabled}/>
            </li>
            <li className="list-group-item">
                <button type="button" 
                        className="btn btn-danger" 
                        onClick={onClickDisable} 
                        style={{display : isDisabled ? "" : "none"}}> Edit Book</button>
                <button type="button" 
                        className="btn btn-danger" 
                        onClick={onClickSave} 
                        style={{display : isDisabled ? "none" : ""}}> Save changes</button>
                <button type="button" 
                        className="btn btn-danger" 
                        onClick={onClickEnable} 
                        style={{display : isDisabled ? "none" : ""}}> Cancel</button>
            </li>
            <li className="list-group-item"><button type="button" className="btn btn-danger" onClick={onClickRemove}>Remove Book</button></li>
            <li className="list-group-item"><QRCode value={props.book._id} /></li>
            </ul>
        </div>
    )
}

export default AdminItem;