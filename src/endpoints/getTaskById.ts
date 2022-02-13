import { Request, Response } from 'express'
import moment from 'moment'
import selectTaskById from '../data/selectUserTaskId'

export default async function getTaskById(
    req: Request,
    res: Response
) {
    let errorCode: number = 400
    try {

        const result = await selectTaskById(req.params.id)

        if (!result) {
            errorCode = 404
            throw new Error("Task not found")
        }

        res.status(200).send({
            id: result.id,
            title: result.title,
            description: result.description,
            limitDate: moment(result.limit_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            status: result.status,
            creatorUserId: result.creator_user_id,
            authorNickname: result.nickname
        })

    } catch (error: any) {
        res.status(errorCode).send({
            message: error.message || error.sqlMessage
        })
    }
}