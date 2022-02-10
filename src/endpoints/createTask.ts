import { Request, Response } from 'express'
import moment from 'moment'
import insertTask from '../data/insertTask'

export default async function createTask(
    req: Request,
    res: Response
) {
    try {
        if (!req.body.title || !req.body.description || !req.body.limitDate || !req.body.creatorUserId) {
            res.status(400).send('Please fill in the fields.')

            return
        }

        const dateDiff: number = moment(req.body.limitDate, 'DD/MM/YYYY').unix() - moment().unix()

        if (dateDiff <= 0) {
            res.status(400).send('"dateDiff" must be a future date')

            return
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
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}