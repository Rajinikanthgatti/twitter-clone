exports.requireLogin = (req, res, next) => {
    if(req.session !== null && req.session.user !== null){
        console.log("LoggedIn")
        return next();
    } else{
        console.log("Redirect to login");
        res.redirect("/login")
    }
}