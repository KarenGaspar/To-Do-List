import { connection } from "../index";

export default async function insertTask(
    id: string,
    title: string,
    description: string,
    limitDate: string,
    creatorUserId: string
) {
    await connection.insert({
        id,
        title,
        description,
        limit_date: limitDate,
        creator_user_id: creatorUserId

    }).into('to_do_list_tasks')
}