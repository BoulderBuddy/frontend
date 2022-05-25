<script lang="ts" context="module">
</script>

<script lang="ts">
    import { getContext } from 'svelte'

    import type {
        ExerciseSetDisplay,
        SetDisplay,
        WorkoutDisplay
    } from '$lib/models/training_session'
    import { key, type TrainingSessionStoreWritable } from './session_store'

    let store = getContext<TrainingSessionStoreWritable>(key)
    {
        $store
    }

    export let workout: WorkoutDisplay

    let exercises = $store.exercises
    $: possibleExercises = exercises.filter(
        (e) => !workout.exercises.map((es) => es.exercise.id).includes(e.id)
    )
    let selectedExercise

    function addNewSet(exercise_set: ExerciseSetDisplay): ExerciseSetDisplay {
        const last_set = exercise_set.sets.at(-1)
        const newValues = last_set.values.map((object) => ({ ...object }))

        const newSet = {
            index: exercise_set.sets.length,
            values: newValues,
            status: last_set.status
        }

        exercise_set.sets = [...exercise_set.sets, newSet]

        return exercise_set
    }

    function removeSet(exercise_set: ExerciseSetDisplay, set: SetDisplay) {
        const index = set.index
        exercise_set.sets.splice(index, 1)
        exercise_set.sets.forEach(function (set, index) {
            set.index = index
        })
        return exercise_set
    }

    function addExercise() {
        const values = selectedExercise.parameters.map((p) => ({
            parameter: p,
            value: 0
        }))
        const first_set = { index: 0, values: values, status: 'COMPLETE' }

        workout.exercises = [
            ...workout.exercises,
            { exercise: selectedExercise, sets: [first_set] }
        ]

        selectedExercise = possibleExercises.find((e) => e.id != selectedExercise.id)
    }

    function removeExercise(exercise) {
        let index = workout.exercises.findIndex((es) => es.exercise.id == exercise.id)
        workout.exercises.splice(index, 1)
        workout.exercises = workout.exercises

        selectedExercise = possibleExercises[0]
    }
</script>

<div>
    {#each workout.exercises as exercise_set (exercise_set.exercise.id)}
        <div class="border-2">
            <div class="flex flex-row items-center space-x-1">
                <p>{exercise_set.exercise.name}</p>
                {#if workout.exercises.length > 1}
                    <button
                        on:click={() => removeExercise(exercise_set.exercise)}
                        class="text-red-700">X</button
                    >
                {/if}
            </div>
            {#each exercise_set.sets as set (set.index)}
                <div>
                    <div class="flex flex-row items-center space-x-1">
                        <p>Set #{set.index + 1}</p>
                        {#if exercise_set.sets.length > 1}
                            <button
                                on:click={() =>
                                    (exercise_set = removeSet(exercise_set, set))}
                                class="text-red-700">X</button
                            >
                        {/if}
                    </div>
                    {#each set.values as value}
                        <div class="flex flex-row items-center space-x-1">
                            <input
                                type="text"
                                inputmode="decimal"
                                pattern="[0-9]"
                                class="border m-1 p-1 w-20"
                                placeholder="0"
                                min="0"
                                bind:value={value.value}
                            />
                            <p>{value.parameter.name}</p>
                        </div>
                    {/each}
                </div>
            {/each}
            <button on:click={() => (exercise_set = addNewSet(exercise_set))}
                >Add Set</button
            >
        </div>
    {/each}
    <div>
        {#if possibleExercises.length > 0}
            <select bind:value={selectedExercise}>
                {#each possibleExercises as exercise (exercise.id)}
                    <option value={exercise}>
                        {exercise.name}
                    </option>
                {/each}
            </select>
            <button on:click={addExercise}>Add Exercise</button>
        {/if}
    </div>
</div>
