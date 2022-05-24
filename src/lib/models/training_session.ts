import type { ExerciseDisplay, ExerciseParameterDisplay } from './frontend'

export interface TrainingSessionDisplay {
    id: number
    date: Date
}

export interface TrainingSessionDetailDisplay {
    id?: number
    date: Date
    comment?: string
    workouts: WorkoutDisplay[]
}

export interface WorkoutDisplay {
    id: number
    exercises: ExerciseSetDisplay[]
}

export interface ExerciseSetDisplay {
    exercise: ExerciseDisplay
    sets: SetDisplay[]
}

export interface SetDisplay {
    index: number
    values: ExerciseParameterValueDisplay[]
    status: string
}

export interface ExerciseParameterValueDisplay {
    parameter: ExerciseParameterDisplay
    value: number
}
