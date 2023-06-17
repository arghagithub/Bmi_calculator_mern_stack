const jwt = require("jsonwebtoken");
const JWTSecret = "~!@#$%&*()_+";
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ message: "Please authenticate with a valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, JWTSecret);
            req.user = data.user;
            next();
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = fetchuser;