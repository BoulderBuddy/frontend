<script lang="ts" context="module">
</script>

<script lang="ts">
    import type {
        ExerciseSetDisplay,
        TrainingSessionDetailDisplay,
        ExerciseParameterValueDisplay,
        SetDisplay
    } from './models/training_session'

    import { onDestroy, getContext } from 'svelte'
    import { key, type TrainingSessionStore } from '$lib/session_store'
    import type { Writable } from 'svelte/store'

    let store = getContext<Writable<TrainingSessionStore>>(key)

    {
        $store
    }

    $: training = $store.active
    $: date = new Date(training.date).toLocaleDateString()

    function addNewSet(exercise_set: ExerciseSetDisplay): ExerciseSetDisplay {
        const last_set = exercise_set.sets.at(-1).values

        const newValues = last_set.map((object) => ({ ...object }))
        const newSet = { index: exercise_set.sets.length, values: newValues, status: '' } // TODO fix status

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
</script>

<div class="flex flex-col pl-2">
    <p class="text-bold">{date} - {training.id}</p>
    <label for="comment">Comment:</label>
    <textarea id="comment" class="border" type="text" bind:value={training.comment} />

    {#each training.workouts as workout (workout.id)}
        <div>
            {#each workout.exercises as exercise_set (exercise_set.exercise.id)}
                <div class="border-2">
                    <p>{exercise_set.exercise.name}</p>
                    {#each exercise_set.sets as set (set.index)}
                        <div>
                            <div class="flex flex-row items-center space-x-1">
                                <!-- <input type="checkbox" bind:checked={set.completed} /> -->
                                <p>Set #{set.index + 1}</p>
                                <button
                                    on:click={() =>
                                        (exercise_set = removeSet(exercise_set, set))}
                                    class="text-red-700">X</button
                                >
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
            <button>Add Exercise</button>
        </div>
    {/each}
    <button>Add Workout</button>
</div>
