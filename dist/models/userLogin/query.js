import UserLogin from './model.js';
export async function findUserLoginByEmail(email) {
    try {
        const login = await UserLogin.aggregate([
            {
                $match: {
                    email: email
                }
            }
        ]);
        return login;
    }
    catch (error) {
        console.error('Error in findUserLoginByEmail:', error);
        throw new Error('Error while finding user login with email from database.');
    }
}
export async function createUserLogin(data) {
    try {
        const login = await UserLogin.create(data);
        return login;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error while creating user login in database.');
    }
}
export async function findUserLoginData(userId) {
    try {
        const loginData = await UserLogin.aggregate([
            {
                $match: {
                    userId: userId
                }
            }
        ]);
        return loginData[0];
    }
    catch (error) {
        console.error('Error in findUserLoginData:', error);
        throw new Error('Error while finding user login data by userId from the database.');
    }
}
//# sourceMappingURL=query.js.map