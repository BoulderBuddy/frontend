export interface ExerciseParameterDisplay {
    id: number
    name: string
}

export interface ExerciseDisplay {
    id: number
    name: string
    parameters: ExerciseParameterDisplay[]
}
