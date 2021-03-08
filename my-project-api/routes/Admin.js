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
		iss : "Bogdan",
		sub : userID
	},"Bogdan", {expiresIn : "1h"});
}

adminRouter.get('/books/:query', passport.authenticate('jwt',{session : false}),(req,res)=>{
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const query = req.params.query;
	
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	
	const results = {}
	
	

	

	if (startIndex > 0) {		
		results.previous = {
			page: page - 1,
			limit: limit
		}
	}
	
	


    Book.find({ $or: [
		{title : new RegExp(query, "i")},
		{author : new RegExp(query, "i")}
	]}).exec((err, books) => {
        if (err) {
            res.status(500).send({error: "Could not fetch books"});
        } else {
		const booksLength = books.length;
				
		if (endIndex < booksLength){
			results.next = {
				page: page + 1,
				limit: limit
			}
			results.results = books.slice(startIndex,endIndex);
			res.json(results);
		}
		else {
			results.results = books.slice(startIndex,endIndex);
			res.json(results);
		}
	
        }
    });
});

adminRouter.post('/book',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const book = new Book(req.body);
    book.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error saving book", msgError: true}});
        else
			res.status(200).json({message : {msgBody : "Successfully created book", msgError : false}});
    })
});

adminRouter.put('/book/:bookId',passport.authenticate('jwt',{session : false}),(req,res)=>{

	const bookId = req.params.bookId;
	const book = req.body;
	
	if(book.borrowedStatus == "borrowed"){
		Book.updateOne({_id : bookId},{borrowedStatus : "stock"}).exec(err => {
		if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({message : {msgBody : "Updated book status successfully", msgError: false}});
        }
	});
	} else {
		res.status(200).json({message : {msgBody : "Book is already in stock", msgError : true}});
	}
			

});

adminRouter.delete('/delete/:book',passport.authenticate('jwt',{session : false}),(req,res)=>{
	const book = req.params.book;
	
	Book.findOneAndDelete({_id : book}).exec(err => {
		if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({message : {msgBody : "Book deleted successfully", msgError: false}});
        }
	});
	
});

adminRouter.put('/modify/:bookId',passport.authenticate('jwt',{session : false}),(req,res)=>{
	const bookId = req.params.bookId;
	const book = req.body;
	
	Book.updateOne({_id : bookId},{title : book.title, author : book.author}).exec(err => {
		if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({message : {msgBody : "Book updated successfully", msgError: false}});
        }
	});
})


module.exports = adminRouter;



