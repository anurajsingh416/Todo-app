const { response } = require('express');
const User = require('../model/newUser');
const Task = require('../model/task');
const bcrypt = require('bcrypt');

function showForm(req,res){
    res.render('register');
}
function landing(req,res){
    res.render('landing');
}
async function register(req,res){
    console.log(req.body);
    try{
        const {username ,email ,password} = req.body;

        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).send("Username is already registered")
        }

        const existingEmail = await User.findOne({email});
        if(existingUsername){
            return res.status(400).send("Email is already registered")
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({username ,email ,password:hashedPassword});
        console.log(req.body);
        // res.status(200).send("Successfully registered");
        res.redirect('/user/login');
    }catch(err){
        // res.status(400).send("Unsuccessful");
        res.send("<script>Alert('Registration Unsuccessful')</script>")
    }
}

function loginForm(req,res){
    res.render('login');
}

async function login(req,res){
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.render('login',{error:"Invalid username/password"});
        }

        const isValid = await bcrypt.compare(password,user.password);

        if(!isValid){
            return res.render('login',{error:"Invalid username/password"});
        }

        req.session.userId = user._id;
        req.session.username = user.username;

        res.redirect("/user/dashboard");
    }catch(err){
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function dashboard(req,res){
    const username = req.session.username;
    const userId = req.session.userId;
    const data = await Task.find({userId: userId});
    res.render('dashboard',{username,data});
}

function logout(req, res){
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to the login page or any other appropriate route
            res.redirect('/user/login');
        }
    });
}


module.exports = {
    showForm,
    register,
    loginForm,
    login,
    dashboard,
    logout,
    landing
}