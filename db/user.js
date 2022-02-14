export const getUserById = async (db, id) => {
    return db.collection('users').findOne({_id: id})
}