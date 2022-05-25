<script context="module" lang="ts">
    import type { ExerciseDisplay } from '$lib/models/frontend'
    import type { TrainingSessionDisplay } from '$lib/models/training_session'
    import Calendar from '$lib/session/Calendar.svelte'
    import TrainingSession from '$lib/session/TrainingSession.svelte'

    export async function load({ fetch }) {
        const res = await fetch('/exercises', {
            method: 'GET',
            headers: { Accept: 'application/json' }
        })
        const { exercises } = await res.json()

        const res2 = await fetch('/sessions', {
            method: 'GET',
            headers: { Accept: 'application/json' }
        })
        const { sessions } = await res2.json()

        return {
            props: { exercises, sessions }
        }
    }
</script>

<script lang="ts">
    import { setContext } from 'svelte'
    import { key, createSessionStore } from '$lib/session/session_store'

    export let exercises: ExerciseDisplay[]
    export let sessions: TrainingSessionDisplay[]

    let store = createSessionStore()
    store.init(new Date(), exercises, sessions)
    setContext(key, store)
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div class="flex justify-between p-6">
    <div>
        <Calendar />
    </div>
    {#await $store.activePromise}
        <div>Loading...</div>
    {:then}
        <div class="border-l ">
            <TrainingSession />
        </div>
    {:catch error}
        <div>Grote probleem {error}</div>
    {/await}
</div>

<div>
    {#if $store.upsertPromise}
        {#await $store.upsertPromise}
            <p>Eventjes lekker updaten</p>
        {:then}
            <p>Heel lekker geupdate</p>
        {:catch error}
            <div>Grote probleem {error}</div>
        {/await}
    {:else}
        <p class=" text-red-700">Geen update</p>
    {/if}
</div>

<style>
</style>
