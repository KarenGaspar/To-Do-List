import { Request, Response } from 'express'
import updateUser from '../data/updateUser'

export default async function editUser(
    req: Request,
    res: Response
) {
    try {
        if (req.body.name === '' || req.body.nickname === '' || req.body.email === '') {
            res.status(400).send({ message: "Please fill in the fields" })
            return
        }

        if (!req.body.name && !req.body.nickname && !req.body.email) {
            res.status(400).send({ message: "Please choose at least one value to update" })
            return
        }
        
        await updateUser(
            req.params.id,
            req.body.name,
            req.body.nickname,
            req.body.email
        )

        res.status(200).send({
            message: "User updated!"
        })

    } catch (error: any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}