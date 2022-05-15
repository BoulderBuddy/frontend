<script lang="ts">
    import type { Exercise } from './frontend_models'

    export let exercise: Exercise
</script>

<div>
    <span>{exercise.name}</span>
    {#each exercise.parameters as parameter}
        <span>{parameter.name}</span>
    {/each}
    <span />
</div>
