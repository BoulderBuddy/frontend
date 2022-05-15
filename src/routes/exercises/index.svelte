<script context="module" lang="ts">
    import Exercise from '$lib/Exercise.svelte'
    import type { ExerciseDisplay } from '$lib/frontend_models'
    export const prerender = true
</script>

<script lang="ts">
    export let exercises: ExerciseDisplay[]
</script>

<svelte:head>
    <title>Exercises</title>
</svelte:head>

<div class="p-6 grid grid-cols-1 gap-4 h-fit">
    {#each exercises as exercise}
        <Exercise {exercise} />
    {/each}
</div>

<style>
</style>
