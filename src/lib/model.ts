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
/**
 *
 * @export
 * @interface Exercise
 */
export interface Exercise {
    /**
     *
     * @type {string}
     * @memberof Exercise
     */
    name: string
    /**
     *
     * @type {number}
     * @memberof Exercise
     */
    id: number
    /**
     *
     * @type {Array<number>}
     * @memberof Exercise
     */
    parameter_ids: Array<number>
}
/**
 *
 * @export
 * @interface ExerciseCreate
 */
export interface ExerciseCreate {
    /**
     *
     * @type {string}
     * @memberof ExerciseCreate
     */
    name: string
    /**
     *
     * @type {Array<number>}
     * @memberof ExerciseCreate
     */
    parameter_ids: Array<number>
}
/**
 *
 * @export
 * @interface ExerciseParameter
 */
export interface ExerciseParameter {
    /**
     *
     * @type {string}
     * @memberof ExerciseParameter
     */
    name: string
    /**
     *
     * @type {string}
     * @memberof ExerciseParameter
     */
    unit_type: string
    /**
     *
     * @type {number}
     * @memberof ExerciseParameter
     */
    id: number
}
/**
 *
 * @export
 * @interface ExerciseParameterCreate
 */
export interface ExerciseParameterCreate {
    /**
     *
     * @type {string}
     * @memberof ExerciseParameterCreate
     */
    name: string
    /**
     *
     * @type {string}
     * @memberof ExerciseParameterCreate
     */
    unit_type: string
}
/**
 *
 * @export
 * @interface ExerciseParameterUpdate
 */
export interface ExerciseParameterUpdate {
    /**
     *
     * @type {string}
     * @memberof ExerciseParameterUpdate
     */
    name?: string
    /**
     *
     * @type {string}
     * @memberof ExerciseParameterUpdate
     */
    unit_type?: string
}
/**
 *
 * @export
 * @interface ExerciseUpdate
 */
export interface ExerciseUpdate {
    /**
     *
     * @type {string}
     * @memberof ExerciseUpdate
     */
    name?: string
    /**
     *
     * @type {Array<number>}
     * @memberof ExerciseUpdate
     */
    parameter_ids?: Array<number>
}
