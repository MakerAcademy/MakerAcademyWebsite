export const getUserById = async (db, id) => {
    return db.collection('users').findOne({_id: id})
}

export const getUserByEmail = async (db, email) => {
    console.log('fetching user');
    return db.collection('users').findOne({email: email})
}