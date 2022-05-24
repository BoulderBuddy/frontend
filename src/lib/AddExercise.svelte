<script context="module" lang="ts">
    import Icon from '@iconify/svelte'
    import baselineAdd from '@iconify/icons-ic/baseline-add'
    import TestModal from '$lib/TestModal.svelte'
    import { browser } from '$app/env'
    import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
    import { getModal } from '$lib/TestModal.svelte'
    import type { ExerciseCreate, ExerciseParameter } from './models/deprecated_backend'

    export let parameters: ExerciseParameter[] = []
    let value: ExerciseCreate

    const dispatch = createEventDispatcher()

    function sendCreateEvent() {
        getModal().close()
        dispatch('create', {
            value: value
        })
    }
</script>

{#if browser}
    <TestModal>
        <div class="flex flex-col">
            <input type="text" placeholder="Exercise name" bind:value={value.name} />
            <select multiple bind:value={value.parameters}>
                {#each parameters as param}
                    <option value={param}>
                        {param.name}
                    </option>
                {/each}
            </select>
            <button on:click|preventDefault={sendCreateEvent}>Create</button>
        </div>
    </TestModal>
{/if}

<button
    on:click={() => getModal().open()}
    class="m-4 flex justify-center items-center p-2 rounded-full bg-indigo-500 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
>
    <Icon icon={baselineAdd} width="28" height="28" class="text-slate-100" />
    <p class="mx-1 hidden text-slate-100  sm:block">Add Exercise</p>
</button>
