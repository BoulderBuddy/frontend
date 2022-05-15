import type {
    Exercise,
    ExerciseParameter,
    ExerciseCreate,
    ExerciseParameterCreate,
    ExerciseParameterUpdate,
    ExerciseUpdate,
    User,
    UserCreate,
    UserUpdate
} from './model'

const base = 'http://backend:8000'

// const notFoundToStr = (error: HTTPErrorNotFound) => `${error.detail}`
// const alreadyExistsToStr = (error: HTTPErrorAlreadyExists) => `${error.detail}: ${error.identifier}`
// const validationErrorToStr = (error: HTTPValidationError) =>  `Ik haat mn leven ${error.detail}`
// const fallbackErrorToStr = (error: string, response: Response) => `${response.status}-${response.statusText} : ${error}`

// const lookup = {
//     400: alreadyExistsToStr,
//     404: notFoundToStr,
//     422: validationErrorToStr,
//     0: null
// }

async function api<T>(
    method: string,
    url: string,
    data?: Record<string, unknown>
): Promise<APIResponse<T>> {
    var res = await fetch(`${base}/${url}`, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: data && JSON.stringify(data)
    })
    var json = await res.json()

    if (res.ok) {
        return { object: json, response: res }
    } else {
        return { error: json, response: res }
    }
}

interface APIResponse<T> {
    error?: any
    object?: T
    response: Response
}

// const requests = {
//     get: (url: string) => api('GET', url),
//     post: (url: string, body: {}) => api('POST', url, body),
//     put: (url: string, body: {}) =>  api('PUT', url, body),
//     delete: (url: string) => api('DELETE', url),
// }

export class BaseAPI<Model, Create, Update> {
    path: string

    constructor(path: string) {
        this.path = path
    }

    get(id: number): Promise<APIResponse<Model>> {
        return api('GET', `${this.path}/${id}`)
    }
    getAll(): Promise<APIResponse<Model[]>> {
        return api('GET', `${this.path}`)
    }
    create(data): Promise<APIResponse<Model>> {
        return api('POST', `${this.path}`, data)
    }
}

export const UserAPI = new BaseAPI<User, UserCreate, UserUpdate>('users')
export const ExerciseAPI = new BaseAPI<
    Exercise,
    ExerciseCreate,
    ExerciseUpdate
>('exercises')
export const ParameterAPI = new BaseAPI<
    ExerciseParameter,
    ExerciseParameterCreate,
    ExerciseParameterUpdate
>('parameters')
