import { UserAPI } from '$lib/backend'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
    //@ts-ignore
    const res = await UserAPI.get(params.id)
    const status = res.response.status
    const error = res.error
    const user = res.object as any

    return {
        status: status,
        body: { user, error }
    }
}
