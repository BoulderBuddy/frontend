import { get, writable } from 'svelte/store'
import type { ExerciseDisplay } from './models/frontend'
import type {
    TrainingSessionDetailDisplay,
    TrainingSessionDisplay
} from './models/training_session'

export interface TrainingSessionStore {
    active?: TrainingSessionDetailDisplay
    exercises?: ExerciseDisplay[]
    sessions?: TrainingSessionDisplay[]
    activePromise?: Promise<{} | void>
    currentDate?: Date
}

function dateCompare(x, y) {
    var xDate = new Date(x)
    var yDate = new Date(y)
    xDate.setHours(0, 0, 0, 0)
    yDate.setHours(0, 0, 0, 0)
    return xDate.valueOf() === yDate.valueOf()
}

const key = Symbol()

function createSessionStore() {
    const { subscribe, set, update } = writable<TrainingSessionStore>({})

    function init(selectedDate: Date, exercises, sessions) {
        set({
            active: { date: selectedDate, workouts: [] },
            currentDate: selectedDate,
            exercises: exercises,
            sessions: sessions,
            activePromise: getActivePromise(selectedDate, sessions)
        })
    }

    function getState() {
        return get({ subscribe })
    }

    function getActivePromise(date, sessions) {
        let matched_session = sessions.find((x) => dateCompare(x.date, date))

        if (matched_session) {
            const response = fetch(`/sessions/${matched_session.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response
                .then((r) => {
                    if (!r.ok) {
                        throw Error('Paniek')
                    }
                    return r.json()
                })
                .then((body) => {
                    update(({ active, ...state }) => {
                        return { ...state, active: body.session }
                    })
                })
        } else {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    let session = { date: date, workouts: [] }
                    update(({ active, ...state }) => {
                        return { ...state, active: session }
                    })
                    resolve()
                }, 1)
            })
        }
    }

    function handleDateInput(date) {
        update(({ currentDate, sessions, activePromise: test, ...state }) => {
            let newActive = getActivePromise(date, sessions)

            return {
                ...state,
                currentDate: date,
                sessions: sessions,
                activePromise: newActive
            }
        })
    }

    return {
        subscribe,
        set,
        update,
        init,
        getState,
        handleDateInput
    }
}

export { key, createSessionStore }
