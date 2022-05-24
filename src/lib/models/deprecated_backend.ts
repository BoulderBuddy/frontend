export interface User {
    first_name?: string
    surname?: string
    email: string
    is_superuser?: boolean
    id: number
}
export interface UserCreate {
    first_name?: string
    surname?: string
    email: string
    is_superuser?: boolean
}
export interface UserUpdate {
    first_name?: string
    surname?: string
    email?: string
    is_superuser?: boolean
}
export type HTTPErrorNotFound = {
    detail: string
}
export interface HTTPValidationError {
    detail?: Array<ValidationError>
}
export interface ValidationError {
    loc: Array<string>
    msg: string
    type: string
}
export interface HTTPErrorAlreadyExists {
    detail: string
    identifier?: any
}

export interface Exercise {
    name: string
    id: number
    parameters: Array<ExerciseParameter>
}

export interface ExerciseCreate {
    name: string
    parameters: Array<ExerciseParameter>
}

export interface ExerciseParameter {
    name: string
    id: number
}

export interface ExerciseParameterCreate {
    name: string
}

export interface ExerciseParameterUpdate {
    name?: string
}

export interface ExerciseUpdate {
    name?: string
    parameters?: Array<ExerciseParameter>
}
