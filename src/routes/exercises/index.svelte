<script context="module" lang="ts">
    import Exercise from '$lib/Exercise.svelte'
    import type { ExerciseDisplay } from '$lib/frontend_models'
    import AddExercise from '$lib/AddExercise.svelte'
    import Icon from '@iconify/svelte'
    import baselineAdd from '@iconify/icons-ic/baseline-add'
    import TestModal from '$lib/TestModal.svelte'
    import { browser } from '$app/env'
    import type { ExerciseCreate } from '$lib/model'

    export const prerender = true
</script>

<script lang="ts">
    export let parameters
    export let exercises: ExerciseDisplay[]
    let exerciseCreate = { name: null, parameter_ids: [] }

    async function handleCreateEvent(event) {
        console.log(event)
        console.log(exerciseCreate)

        const response = await fetch('/exercises', {
            method: 'post',
            headers: {
                accept: 'application/json'
            },
            body: JSON.stringify(exerciseCreate)
        })
        var json = await response.json()
        console.log(response.status)
        console.log(json)
        console.log(exercises)
        exercises = [...exercises, json.exercise]
    }
</script>

<svelte:head>
    <title>Exercises</title>
</svelte:head>

<div>
    <AddExercise
        on:create={handleCreateEvent}
        bind:value={exerciseCreate}
        bind:parameters
    />
    <!-- {#if browser}
        <TestModal>
            <input type="text" bind:value="">
        </TestModal>
    {/if}

    <button
        on:click={() => getModal().open()}
        class="absolute bottom-0 right-0 m-4 flex justify-center items-center p-2 rounded-full bg-indigo-500 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
        <Icon icon={baselineAdd} width="28" height="28" class="text-slate-100" />
        <p class="mx-1 hidden text-slate-100  sm:block">Add Exercise</p>
    </button> -->
</div>
<div class="p-6 grid grid-cols-1 gap-4 h-fit">
    {#each exercises as exercise}
        <Exercise {exercise} />
    {/each}
</div>

<style>
</style>
