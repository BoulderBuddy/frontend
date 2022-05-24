import { ExerciseAPI, ParameterAPI } from '$lib/backend'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({}) => {
    //@ts-ignore
    const res = await ExerciseAPI.getAll()
    //@ts-ignore
    const param_res = await ParameterAPI.getAll()

    const status = res.response.status
    const error = res.error

    const parameters = param_res.object as any
    const exercises = res.object as any

    return {
        status: status,
        body: { exercises, parameters, error }
    }
}

export const post: RequestHandler = async ({ request }) => {
    const data = await request.json()

    await ExerciseAPI.create(data)
    return {}
}

export const put: RequestHandler = async ({ request }) => {
    const data = await request.json()
    const id = data.id
    console.log(data)
    const res = await ExerciseAPI.update(id, data)
    console.log(res)
    return {}
}

export const del: RequestHandler = async ({ request }) => {
    const id = await request.json()
    await ExerciseAPI.del(id)
    return {}
}
