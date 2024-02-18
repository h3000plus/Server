import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const comparePassword = async (password, hash) => {
    // const result = await bcrypt.compare(password, hash)
    // return result
    return password === hash;
};
const generateHash = async (password) => {
    return await bcrypt.hash(password, 10);
};
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
export { comparePassword, generateHash, generateToken, verifyToken };
//# sourceMappingURL=auth.js.map