import { SessionsAPI } from '$lib/backend'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({}) => {
    //@ts-ignore
    const res = await SessionsAPI.getAll()
    const status = res.response.status
    const error = res.error
    const sessions = res.object as any

    return {
        status: status,
        body: { sessions, error }
    }
}

export const put: RequestHandler = async ({ request }) => {
    const data = await request.json()

    data.date = new Date(data.date).toLocaleDateString('en-CA') //TODO I Hate this

    data.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise_set) => {
            exercise_set.exercise_id = exercise_set.exercise.id
            exercise_set.exercise = undefined
            exercise_set.sets.forEach((set) => {
                set.values.forEach((value) => {
                    value.parameter_id = value.parameter.id
                    value.parameter = undefined
                })
            })
        })
    })

    const res = await SessionsAPI.upsert(data)

    const status = res.response.status
    const error = res.error
    const session = res.object as any

    return {
        status: status,
        body: { session, error }
    }
}
