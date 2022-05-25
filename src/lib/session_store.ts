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
    upsertPromise?: Promise<{} | void>
    currentDate?: Date
}

function dateCompare(x, y) {
    var xDate = new Date(x)
    var yDate = new Date(y)
    xDate.setHours(0, 0, 0, 0)
    yDate.setHours(0, 0, 0, 0)
    return xDate.valueOf() === yDate.valueOf()
}

function checkResponse(r) {
    if (!r.ok) {
        return r.json().then((error) => {
            const errMsg = JSON.stringify(error)
            throw new Error(errMsg)
        })
    }
    return r.json()
}

const key = Symbol()

const SESSION_ENDPOINT = '/sessions'

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
            const response = fetch(
                `${SESSION_ENDPOINT}/${matched_session.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response.then(checkResponse).then((body) => {
                update(({ active, ...state }) => {
                    return { ...state, active: body.session }
                })
            })
        } else {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    // Why is this necessary ???
                    let session = { date: date, workouts: [] }
                    update(({ active, ...state }) => {
                        return { ...state, active: session }
                    })
                    resolve()
                }, 1)
            })
        }
    }

    function postSession(active: TrainingSessionDetailDisplay) {
        if (
            (active.comment && active.comment.length > 0) ||
            active.workouts.length > 0
        ) {
            return fetch(`${SESSION_ENDPOINT}/`, {
                method: 'PUT',
                headers: {
                    accept: 'application/json'
                },
                body: active && JSON.stringify(active)
            })
                .then(checkResponse)
                .then((r) => {
                    update(({ sessions, ...state }) => {
                        let hit = sessions.find((s) => s.id == r.session.id)
                        if (!hit) {
                            sessions = [...sessions, r.session]
                        }
                        return { ...state, sessions: sessions }
                    })
                })
        }
    }

    function handleDateInput(date) {
        update(
            ({
                currentDate,
                sessions,
                activePromise,
                active,
                upsertPromise,
                ...state
            }) => {
                let newActive = getActivePromise(date, sessions)
                let newUpsertPromise = postSession(active)

                return {
                    ...state,
                    active: active,
                    currentDate: date,
                    sessions: sessions,
                    activePromise: newActive,
                    upsertPromise: newUpsertPromise
                }
            }
        )
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
