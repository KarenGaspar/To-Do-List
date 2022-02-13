import { Request, Response } from 'express'
import insertUser from '../data/insertUser'


export default async function createUser(
    req: Request,
    res: Response
) {
    let errorCode: number = 400
    try {
        if (
            !req.body.name || !req.body.nickname || !req.body.email
        ) {
            errorCode = 422
            throw new Error('Please fill in all the fields.')

        }

        const id = Date.now().toString()

        await insertUser(
            id,
            req.body.name,
            req.body.nickname,
            req.body.email
        )
        res.status(201).send('User created successfuly!')
    } catch (error: any) {
        res.status(errorCode).send({
            message: error.message || error.sqlMessage
        })
    }
}