import { verifyToken } from '../utilities/auth.js';
const protectMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401);
        res.json({ message: 'You are not authorized' });
        return;
    }
    try {
        const user = verifyToken(token);
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        res.json({ message: 'You are not authorized' });
        return;
    }
};
export default protectMiddleware;
//# sourceMappingURL=protect.middleware.js.map