//Dependencies
module.exports = function(app, passport) {
    app.get("/signup", function(req, res) {
        res.render("/index");
    });

    app.get("/signin", function(req, res) {
        res.render("signup");
    });

    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });

    app.get("/dashboard", isLoggedIn, function(req, res) {
        res.render("dashboard");
    });

    app.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });
    
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/")
    }
}