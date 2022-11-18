import {db} from '../models/index.js'


async function getAll(req, res) {
    const users = await db.User.findAll()
    res.json(users)
    return users
}
async function getById(req, res) {
    const {id} = req.params
    const user = await db.User.findAll({
        where: {
            id: id
        }
    })
    res.json(user)
    return user
}

async function create(req, res) {
    const {name, password_hash, email, provider} = req.body

    const user = await db.User.create({
        name,
        password_hash,
        email,
        provider
    })
    res.json(user)
    return user
}

async function update(req, res) {
    const {id} = req.params
    const {name, password_hash, email, provider} = req.body

    const user = await db.User.update(
        {name,
            password_hash,
            email,
            provider},
        { where: {id: id}}
    )
    res.json(user)
    return user
}

async function remove(req, res) {
    const {id} = req.params
    const user = await db.User.destroy({
        where: {
            id: id
        }
    })
    res.json(user)
    return user
}

export {getAll, getById, create, update, remove}
