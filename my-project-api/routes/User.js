const express = require('express');
const userRouter = express.Router();
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


userRouter.post('/register',(req,res)=>{
	const { username,password,role } = req.body;
	User.findOne({username},(err,user)=>{
		if(err)
			res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
		if(user)
			res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
		else{
			const newUser = new User({username,password,role});
			newUser.save(err=>{
				if(err)
					res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
				else
					res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
			});
		}
	});
});

userRouter.post('/login',passport.authenticate('local', {session : false}),(req,res)=>{
	if(req.isAuthenticated()){
		const {_id,username,role} = req.user;
		const token = signToken(_id);
		res.cookie('access_token',token,{httpOnly: true, sameSite: true});
		res.status(200).json({isAuthenticated : true, user : {username,role}});
		
	}
});

userRouter.get('/logout',passport.authenticate('jwt', {session : false}),(req,res)=>{
	res.clearCookie('access_token');
	res.json({user: {username : "", role : ""}, success : true});
});

userRouter.post('/book',passport.authenticate('jwt',{session : false}),(req,res)=>{

	const book = req.body;
	
	if(book.borrowedStatus == "stock"){
		req.user.books.push(book);
		req.user.save(err => {
		if(err)
			res.status(500).json({message : {msgBody : "Error has occured on saving the book", msgError: true}});
        else{
			Book.findOneAndUpdate({_id : req.body._id},{$set: {borrowedStatus : "borrowed"}}, {new: true}, (err,doc) => {
				if(err){
					res.status(500).json({message : {msgBody : "Error on modifying status", msgError : false}});
				}
				res.status(200).json({message : {msgBody : "Successfully added book", msgError : false}});
			});
		}
	});
	} else {
		res.status(200).json({message : {msgBody : "Book is already borrowed", msgError : true}});
	}
	
	
	// res.json({user , book});
			

});

userRouter.get('/books',passport.authenticate('jwt',{session : false}),(req,res)=>{
	User.findById({_id : req.user._id}).populate({path: 'books', options: {sort: {'_id': 1}}}).exec((err,document)=>{
		if(err)
			res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
		else{
			res.status(200).json({books : document.books, authenticated : true});
		}
	});
});

userRouter.get('/search/:query',(req,res)=>{
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
			
/* 		let booksLength=books.length;
			let booksToFilter = [];
			let booksToSend = [];
			
			for (let i = 0; i<booksLength; i++){
				if(!booksToFilter.includes(books[i].bookID)){
					booksToFilter.push(books[i].bookID);
				booksToSend.push(books[i]);}
			}
			
			res.json(booksToSend);	 */
			
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

userRouter.get('/book/:bookId',passport.authenticate('jwt',{session : false}),(req,res)=>{
	const bookId = req.params.bookId;
	
	Book.findById({_id : bookId}).exec((err,document)=>{
		if(err)
			res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
		else
			res.status(200).json({book: document});
	});
});

/* userRouter.get('/search/:query',(req,res)=>{
	const query = req.params.query;
	
	Book.find({ $or: [
		{title : new RegExp(query, "i")},
		{author : new RegExp(query, "i")}
	]}).exec((err, books) => {
        if (err) {
            res.status(500).send({error: "Could not fetch books"});
        } else {
			let idSet = [...new Set(books.map(item => item.bookID))];;
			
			let booksToFilter = [];
			
			let getUniqueBook =  (value1, value2, set) => {
				booksToFilter.push(value1);
				
			}
			
			idSet.forEach(getUniqueBook);
			
			res.json(books);
		}
		
	});
	
}); */

userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
	if(req.user.role === 'admin'){
		res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
	}
	else
		res.status(403).json({message : {msgBody : "You're not an admin, go away", msgError : true}});
});

//making sure the user stays authenticated when leaving the site
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
	const {username,role} = req.user;
	res.status(200).json({isAuthenticated : true, user : {username,role}});
});

module.exports = userRouter;



