import { Request, Response } from 'express'
import selectUserById from '../data/selectUserById'

export default async function getUserById(
    req: Request,
    res: Response
) {
    let errorCode: number = 400
    try {
        const user = await selectUserById(req.params.id)
        
        if(!user){
            errorCode = 404
            throw new Error("User not found!")
        }

        res.status(200).send({
            message: "Success",
            id: user.id,
            nickname: user.nickname
        })
    } catch (error: any) {
        res.status(errorCode).send({
            message: error.message || error.sqlMessage
        })
    }
}