import type {
    Exercise,
    ExerciseParameter,
    ExerciseCreate,
    ExerciseParameterCreate,
    ExerciseParameterUpdate,
    ExerciseUpdate,
    User,
    UserCreate,
    UserUpdate,
    HTTPErrorNotFound,
    HTTPValidationError
} from '$lib/models/deprecated_backend'
import type {
    TrainingSessionDetailDisplay,
    TrainingSessionDisplay
} from '$lib/models/training_session'

const base = 'http://backend:8000'

const notFoundToStr = (error: HTTPErrorNotFound) => `${error.detail}`
const validationErrorToStr = (error: HTTPValidationError) => {
    return `${JSON.stringify(error.detail)}`
}
const fallbackErrorToStr = (error: string, response: Response) =>
    `${response.status}-${response.statusText} : ${error}`

const lookup = {
    404: notFoundToStr,
    422: validationErrorToStr,
    0: null
}

async function api<T>(
    method: string,
    url: string,
    data?: Record<string, unknown>
): Promise<APIResponse<T>> {
    return fetch(`${base}/${url}`, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: data && JSON.stringify(data)
    }).then((r) => {
        let r_clone = r.clone()

        if (r.ok) {
            return r.json().then((o) => {
                return { object: o, response: r_clone }
            })
        } else {
            return r.json().then((error) => {
                const errorFunc = lookup[r_clone.status]
                let errorMsg = fallbackErrorToStr(error, r_clone)

                if (errorFunc) {
                    errorMsg = errorFunc(error)
                }

                return { error: errorMsg, response: r_clone }
            })
        }
    })
}

interface APIResponse<T> {
    error?: any
    object?: T
    response: Response
}

export class BaseAPI<Model, Create, Update, DetailModel = Model> {
    path: string

    constructor(path: string) {
        this.path = path
    }

    get(id: number): Promise<APIResponse<DetailModel>> {
        return api('GET', `${this.path}/${id}`)
    }
    getAll(): Promise<APIResponse<Model[]>> {
        return api('GET', `${this.path}/`)
    }
    create(data): Promise<APIResponse<DetailModel>> {
        return api('POST', `${this.path}/`, data)
    }
    upsert(data): Promise<APIResponse<DetailModel>> {
        return api('PUT', `${this.path}/`, data)
    }
    update(id: number, data): Promise<APIResponse<DetailModel>> {
        return api('PUT', `${this.path}/${id}`, data)
    }
    del(id: number): Promise<APIResponse<DetailModel>> {
        return api('DELETE', `${this.path}/${id}`)
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
export const SessionsAPI = new BaseAPI<
    TrainingSessionDisplay,
    object,
    object,
    TrainingSessionDetailDisplay
>('sessions')
