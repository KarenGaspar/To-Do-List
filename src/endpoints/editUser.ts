import { Request, Response } from 'express'
import updateUser from '../data/updateUser'

export default async function editUser(
    req: Request,
    res: Response
) {
    let errorCode: number = 400
    try {
        if (req.body.name === '' || req.body.nickname === '' || req.body.email === '') {
            errorCode = 422
            throw new Error("Please fill in all the fields" )
        }

        if (!req.body.name && !req.body.nickname && !req.body.email) {
            errorCode = 422
            throw new Error("Please choose at least one value to update")
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
        res.status(errorCode).send({
            message: error.message || error.sqlMessage
        })
    }
}