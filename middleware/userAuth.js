const { rawListeners } = require("../model/newUser");

function isAuthenticated(req,res,next){
    if(req.session.userId){
        next();
    }else{
        res.redirect('/user/login');
    }
}

module.exports = {
    isAuthenticated
}