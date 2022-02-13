import { Request, Response } from 'express'
import moment from 'moment'
import insertTask from '../data/insertTask'

export default async function createTask(
    req: Request,
    res: Response
) {
    let errorCode:number = 400
    try {
        if (!req.body.title || !req.body.description || !req.body.limitDate || !req.body.creatorUserId) {
            throw new Error ('Please fill in all the fields.')
        }

        const dateDiff: number = moment(req.body.limitDate, 'DD/MM/YYYY').unix() - moment().unix()

        if (dateDiff <= 0) {
            throw new Error ('"dateDiff" must be a future date')
        }

        const id = Date.now().toString()

        await insertTask(
            id,
            req.body.title,
            req.body.description,
            moment(req.body.limitDate, 'DD/MM/YYYY').format('YYYY/MM/DD'),
            req.body.creatorUserId
        )
        res.status(201).send({
            message: "Task created successfuly",
            id
        })

    } catch (error: any) {
        res.status(errorCode).send({
            message: error.message || error.sqlMessage
        })
    }
}