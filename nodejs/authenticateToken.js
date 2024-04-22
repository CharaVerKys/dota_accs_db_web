
import  jwt from 'jsonwebtoken';



export default function authenticateToken(req, res, next) {
    
    console.log(req.cookies.token);
    const token = req.cookies.token;



    if (!token) {
return res.json({ log: 'notlogged' });
    }

    jwt.verify(token, 'mysecretkey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token is not valid' });
        }

        req.user = decoded;
        next();
    });
}