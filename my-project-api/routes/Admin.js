const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../model/User');
const Book = require('../model/Book');


//the key has to match the secretOrKey from passport
const signToken = userID => {
	return JWT.sign({
		iss : "NoobCoder",
		sub : userID
	},"NoobCoder", {expiresIn : "1h"});
}

adminRouter.get('/books', function(request, response) {

    Book.find({},function(err, books) {
        if (err) {
            response.status(500).send({error: "Could not fetch books"});
        } else {
            response.send(books);
        }
    });
});

adminRouter.post('/book',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const book = new Book(req.body);
    book.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Prima eroare", msgError: true}});
        else
			res.status(200).json({message : {msgBody : "Successfully created book", msgError : false}});
    })
});


module.exports = adminRouter;



