const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ams@faculty';

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    console.log("Inside middleware")
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token!" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token, authentication failed!" });
    }
};

module.exports = fetchuser;
