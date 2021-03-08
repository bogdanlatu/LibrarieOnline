export default {
    getBooks : (page,limit,query)=>{
        return fetch('/admin/books/' + query +'?page=' + page + '&limit=' + limit)
                .then(response=>{
                    if(response.status != 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "Unauthorized",msgError : true}};
                });
    },
    
    postBook : book=>{
        return fetch('/admin/book',{
            method : "post",
            body : JSON.stringify(book),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status != 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "Unauthorized",msgError : true}};
        });
    },
    
    deleteBook : book => {
        return fetch('/admin/delete/' + book,{
            method : "delete",
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status != 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "Unauthorized", msgError : true}};
        });
    },
    
    modifyBook : (book,bookId) => {
        return fetch('/admin/modify/' + bookId, {
            method : "put",
            body : JSON.stringify(book),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status != 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "Unauthorized", msgError : true}};
        });
        
    },
    
    updateBook : (book) => {
        return fetch('/admin/book/' + book._id, {
            method : "put",
            body : JSON.stringify(book),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status != 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "Unauthorized", msgError : true}};
        });
        
    }
}