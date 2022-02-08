import { Request, Response } from 'express'
import insertUser from '../data/insertUser'


export default async function createUser(
    req: Request,
    res: Response
) {
    try {
        if (
            !req.body.name || !req.body.nickname || !req.body.email
        ) {
            res.status(400).send('Please fill in the fields.')

            return
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
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}