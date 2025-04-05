const { validatetoken } = require("../services/authentication");

function CheckAuthenticationforuser(cookiename) {
    return (req, res, next) => {
        const token = req.cookies[cookiename]; // Corrected: Use req.cookies

        if (!token) {
            res.locals.user = null;
            return next();
        }

        try {
            const user = validatetoken(token); // Validate the token
            if (!user) {
                res.locals.user = null;
                return res.status(403).send("Invalid or expired token.");
            }

            req.user = user;
            res.locals.user = user; // Attach user info to request
            next(); // Move to the next middleware or route handler
        } catch (error) {
            res.locals.user = null;
            return res.status(403).send("Token verification failed.");
        }
    };
}


function requireAuth(req, res, next) {
    if (!req.user) {
        
        return res.redirect("/user/signin");
    }
    next(); // Allow the route logic to execute
}


module.exports = { CheckAuthenticationforuser, requireAuth };


