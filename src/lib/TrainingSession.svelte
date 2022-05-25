<script lang="ts" context="module">
</script>

<script lang="ts">
    import { getContext } from 'svelte'
    import { key, type TrainingSessionStore } from '$lib/session_store'
    import type { Writable } from 'svelte/store'
    import Workout from './Workout.svelte'

    let store = getContext<Writable<TrainingSessionStore>>(key)

    {
        $store
    }

    $: training = $store.active
    $: date = new Date(training.date).toLocaleDateString()

    function addWorkout() {
        training.workouts = [...training.workouts, { id: null, exercises: [] }]
    }
</script>

<div class="flex flex-col pl-2">
    <p class="text-bold">{date} - {training.id}</p>
    <label for="comment">Comment:</label>
    <textarea id="comment" class="border" type="text" bind:value={training.comment} />

    {#each training.workouts as workout (workout.id)}
        <Workout bind:workout />
    {/each}
    <button on:click={addWorkout}>Add Workout</button>
</div>
