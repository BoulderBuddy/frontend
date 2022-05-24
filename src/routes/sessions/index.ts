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
