import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ locals }) => {
    //@ts-ignore
    if (locals.user_id) {
        return {
            status: 302,
            headers: {
                location: `/profile/${locals.user_id}`
            }
        }
    } else {
        return {
            status: 302,
            headers: {
                location: `/register`
            }
        }
    }
}
