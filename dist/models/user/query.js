import User from "./model.js";
// import UserLogin from "../userLogin/model.js";
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    }
    catch (error) {
        console.error("Error in findUserByEmail:", error);
        throw error;
    }
};
const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        console.error("Error in findUserByEmail:", error);
        throw error;
    }
};
const createUser = async (userObject) => {
    try {
        const { email, address, password } = userObject;
        const user = await User.create({ email, address, password });
        return user;
    }
    catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};
const isEmailExists = async (email) => {
    try {
        console.log(email);
        const existingUser = await User.findOne({ email });
        // console.log(existingUser);
        if (existingUser) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error in isEmailExists:", error);
        throw error;
    }
};
export { findUserByEmail, findUserById, createUser, isEmailExists };
//# sourceMappingURL=query.js.map