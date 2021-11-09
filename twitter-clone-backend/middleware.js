exports.requireLogin = (req, res, next) => {
    //console.log(req.session)
    //console.log(req.session.user)
    if((req.session !== null && req.session !== undefined) && (req.session.user !== null && req.session.user !== undefined)){
        console.log("LoggedIn")
        return next();
    } else{
        console.log("Redirect to login");
        res.redirect("/login")
    }
}