import { ParameterAPI } from '$lib/backend'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({}) => {
    //@ts-ignore
    const res = await ParameterAPI.getAll()

    const status = res.response.status
    const error = res.error

    const parameters = res.object as any
    console.log(parameters)

    return {
        status: status,
        body: { parameters, error }
    }
}
