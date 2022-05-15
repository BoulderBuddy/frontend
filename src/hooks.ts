import type { Handle } from '@sveltejs/kit'
import * as cookie from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')
    event.locals.user_id = cookies['user_id'] || '2'

    const response = await resolve(event)

    if (!cookies['user_id']) {
        // if this is the first time the user has visited this app,
        // set a cookie so that we recognise them when they return
        response.headers.set(
            'set-cookie',
            cookie.serialize('user_id', event.locals.user_id, {
                path: '/',
                httpOnly: true
            })
        )
    }

    return response
}
