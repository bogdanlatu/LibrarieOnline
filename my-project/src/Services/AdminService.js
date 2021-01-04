export default {
    getBooks : ()=>{
        return fetch('/admin/books')
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
    }
}