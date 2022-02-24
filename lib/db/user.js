import { verifyPassword } from "../auth/auth";
export const getUserByEmail = async (db, email) => {
    console.log('fetching user');
    return db.collection('users').findOne({email: email})
}

export const AuthenticateUser = async (db, credentials) => {
    const user = await db.collection('users').findOne({email: credentials.email});
    if (!user) {
        return false
    }
    if(verifyPassword(credentials.password, user.password)) {
        delete user.password
        return user
    }
    return false
}