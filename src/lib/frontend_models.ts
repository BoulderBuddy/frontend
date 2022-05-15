import type { ExerciseParameter } from './model'

export interface ExerciseDisplay {
    id: number
    name: string
    parameters: ExerciseParameter[]
}
