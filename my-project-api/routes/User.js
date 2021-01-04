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
		iss : "NoobCoder",
		sub : userID
	},"NoobCoder", {expiresIn : "1h"});
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
    const book = new Book(req.body);
    book.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Prima eroare", msgError: true}});
        else{
            req.user.books.push(book);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "A doua eroare", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created book", msgError : false}});
            });
        }
    })
});

userRouter.get('/books',passport.authenticate('jwt',{session : false}),(req,res)=>{
	User.findById({_id : req.user._id}).populate('books').exec((err,document)=>{
		if(err)
			res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
		else{
			res.status(200).json({books : document.books, authenticated : true});
		}
	});
});

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



