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

    exercises.forEach((element) => {
        element.parameters = element.parameter_ids.map((x) =>
            parameters.find((y) => y.id == x)
        )
    })

    return {
        status: status,
        body: { exercises, parameters, error }
    }
}

export const post: RequestHandler = async ({ request }) => {
    const data = await request.json() // or .json(), or .text(), etc

    const res = await ExerciseAPI.create(data)
    const status = res.response.status
    const error = res.error
    const exercise = res.object as any

    //@ts-ignore
    const param_res = await ParameterAPI.getAll()

    exercise.parameters = exercise.parameter_ids.map((x) =>
        param_res.object.find((y) => y.id == x)
    )

    return {
        status: status,
        body: { exercise, error }
    }
}
