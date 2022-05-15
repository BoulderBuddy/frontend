import { ExerciseAPI, ParameterAPI } from '$lib/backend'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({}) => {
    //@ts-ignore
    const res = await ExerciseAPI.getAll()
    //@ts-ignore
    const param_res = await ParameterAPI.getAll()

    const status = res.response.status
    const error = res.error

    const parameters = param_res.object
    const exercises = res.object as any

    exercises.forEach((element) => {
        element.parameters = element.parameter_ids.map((x) =>
            parameters.find((y) => y.id == x)
        )
    })

    return {
        status: status,
        body: { exercises, error }
    }
}
