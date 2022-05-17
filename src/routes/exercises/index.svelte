<script context="module" lang="ts">
    import Exercise from '$lib/Exercise.svelte'
    import type { ExerciseDisplay } from '$lib/frontend_models'
    import AddExercise from '$lib/AddExercise.svelte'
    import { invalidate } from '$app/navigation'

    export const prerender = true
</script>

<script lang="ts">
    export let parameters
    export let exercises: ExerciseDisplay[]
    let exerciseCreate = { name: null, parameters: [] }

    async function handleApiCall(url, method, data?) {
        const response = await fetch(url, {
            method: method,
            headers: {
                accept: 'application/json'
            },
            body: data && JSON.stringify(data)
        })
        if (response.ok) {
            invalidate(url)
        }
    }

    async function handleCreateEvent(event) {
        var data = event.detail.value
        await handleApiCall('/exercises', 'post', data)
    }

    async function handleDelete(event) {
        var id = event.detail.value
        await handleApiCall('/exercises', 'delete', id)
    }

    async function handleUpdate(event) {
        var exercise = event.detail.value
        await handleApiCall('/exercises', 'put', exercise)
    }
</script>

<svelte:head>
    <title>Exercises</title>
</svelte:head>

<div>
    <div class="fixed bottom-0 right-0 z-50">
        <AddExercise
            on:create={handleCreateEvent}
            bind:value={exerciseCreate}
            bind:parameters
        />
    </div>
</div>
<div
    class="p-6 grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
>
    {#each exercises.sort( (a, b) => a.name.localeCompare(b.name) ) as exercise (exercise.id)}
        <div class="max-w-[18rem]">
            <Exercise on:delete={handleDelete} on:update={handleUpdate} {exercise} />
        </div>
    {/each}
</div>

<style>
</style>
