<script context="module" lang="ts">
    import Exercise from '$lib/Exercise.svelte'
    export const prerender = true

    export async function load({ fetch }) {
        const res = await fetch('/exercises', {
            method: 'GET',
            headers: { Accept: 'application/json' }
        })
        const { exercises } = await res.json()

        return {
            props: { exercises }
        }
    }
</script>

<script lang="ts">
    export let exercises
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div>Homepagina</div>

<style>
</style>
