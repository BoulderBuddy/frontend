import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

//export const BASE_PATH = document.location.protocol + "//" + document.location.hostname + ":8004"
const BASE_PATH = 'http://willem.kantine:8004'

const instance = axios.create({
    baseURL: BASE_PATH
})

const responseBody = (response: AxiosResponse) => response.data

function notFoundToStr(error: HTTPErrorNotFound) {
    return `${error.detail}`
}

function alreadyExistsToStr(error: HTTPErrorAlreadyExists) {
    return `${error.detail}: ${error.identifier}`
}

function validationErrorToStr(error: HTTPValidationError) {
    return `Ik haat mn leven`
}

const lookup = {
    400: alreadyExistsToStr,
    404: notFoundToStr,
    422: validationErrorToStr,
    0: null
}

const errorHandler = (error: AxiosError) => {
    let errorMessage: string = 'Unknown error'
    if (error.response) {
        let handler = lookup[error.response.status as keyof typeof lookup]
        if (handler) {
            //@ts-ignore
            errorMessage = handler(error.response.data)
        }
    } else if (error.request) {
        //Handle bad request
    } else {
        errorMessage = error.message
    }
    console.log(error)
    throw new Error(errorMessage)
}

const requests = {
    get: (url: string) =>
        instance.get(url).then(responseBody).catch(errorHandler),
    post: (url: string, body: {}) =>
        instance.post(url, body).then(responseBody).catch(errorHandler),
    put: (url: string, body: {}) =>
        instance.put(url, body).then(responseBody).catch(errorHandler),
    delete: (url: string) =>
        instance.delete(url).then(responseBody).catch(errorHandler)
}

abstract class BaseAPI<Model, Create, Update> {
    path: string
    constructor(path: string) {
        this.path = path
    }

    getAll(): Promise<Model[]> {
        return requests.get(this.path)
    }
    get(id: number): Promise<Model> {
        return requests.get(`${this.path}/${id}`)
    }
    create(post: Create): Promise<User> {
        return requests.post(this.path, post)
    }
    update(post: Update, id: number): Promise<Model> {
        return requests.put(`${this.path}/${id}`, post)
    }
}

export class UserApi extends BaseAPI<User, UserCreate, UserUpdate> {
    constructor() {
        super('users')
    }
}

export const globalUserApi = new UserApi()

/**
 *
 * @export
 * @interface User
 */
export interface User {
    /**
     *
     * @type {string}
     * @memberof User
     */
    first_name?: string
    /**
     *
     * @type {string}
     * @memberof User
     */
    surname?: string
    /**
     *
     * @type {string}
     * @memberof User
     */
    email: string
    /**
     *
     * @type {boolean}
     * @memberof User
     */
    is_superuser?: boolean
    /**
     *
     * @type {number}
     * @memberof User
     */
    id: number
}
/**
 *
 * @export
 * @interface UserCreate
 */
export interface UserCreate {
    /**
     *
     * @type {string}
     * @memberof UserCreate
     */
    first_name?: string
    /**
     *
     * @type {string}
     * @memberof UserCreate
     */
    surname?: string
    /**
     *
     * @type {string}
     * @memberof UserCreate
     */
    email: string
    /**
     *
     * @type {boolean}
     * @memberof UserCreate
     */
    is_superuser?: boolean
}
/**
 *
 * @export
 * @interface UserUpdate
 */
export interface UserUpdate {
    /**
     *
     * @type {string}
     * @memberof UserUpdate
     */
    first_name?: string
    /**
     *
     * @type {string}
     * @memberof UserUpdate
     */
    surname?: string
    /**
     *
     * @type {string}
     * @memberof UserUpdate
     */
    email?: string
    /**
     *
     * @type {boolean}
     * @memberof UserUpdate
     */
    is_superuser?: boolean
}

/**
 *
 * @export
 * @interface HTTPErrorNotFound
 */
export type HTTPErrorNotFound = {
    /**
     *
     * @type {string}
     * @memberof HTTPErrorNotFound
     */
    detail: string
}
/**
 *
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     *
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    detail?: Array<ValidationError>
}
/**
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     *
     * @type {Array<string>}
     * @memberof ValidationError
     */
    loc: Array<string>
    /**
     *
     * @type {string}
     * @memberof ValidationError
     */
    msg: string
    /**
     *
     * @type {string}
     * @memberof ValidationError
     */
    type: string
}
/**
 *
 * @export
 * @interface HTTPErrorAlreadyExists
 */
export interface HTTPErrorAlreadyExists {
    /**
     *
     * @type {string}
     * @memberof HTTPErrorAlreadyExists
     */
    detail: string
    /**
     *
     * @type {any}
     * @memberof HTTPErrorAlreadyExists
     */
    identifier?: any
}
