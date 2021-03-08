export default {
    getBook : bookId => {
        return fetch('/user/book/' + bookId)
                .then(response=>{
                if(response.status != 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "Unauthorized",msgError : true}};
        });
    },
    
    getResults : (page,limit,query) => {
        return fetch('/user/search/' + query +'?page=' + page + '&limit=' + limit)
                .then(response=>{
                if(response.status != 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "Unauthorized",msgError : true}};
        });
    },
    
    getBooks : ()=>{
        return fetch('/user/books')
                .then(response=>{
                    if(response.status != 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "Unauthorized",msgError : true}};
                });
    },
    
    postBook : book=>{
        return fetch('/user/book',{
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
    }
}