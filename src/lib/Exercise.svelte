<script lang="ts" context="module">
</script>

<script lang="ts">
    import type { ExerciseDisplay } from './frontend_models'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    $: hasChanges = exercise.name != exerciseEdit.name

    export let exercise: ExerciseDisplay
    export const isCreator = false

    let isSelected = false
    let isEditable = false

    let exerciseEdit = { ...exercise }

    function handleSelect() {
        isSelected = true
    }
    function handleDeselect() {
        isSelected = false
    }

    function onDelete() {
        dispatch('delete', {
            value: exercise.id
        })
    }

    function onUpdate() {
        dispatch('update', {
            value: exerciseEdit
        })
    }

    function onCreate() {
        dispatch('create', {
            value: exerciseEdit
        })
    }

    function onSave() {
        if (isCreator) {
            onCreate()
        } else {
            onUpdate()
        }
    }
</script>

<div
    on:mouseenter={handleSelect}
    on:focus={handleSelect}
    on:mouseleave={handleDeselect}
    on:blur={handleDeselect}
    class="border-2 px-8 max-w-sm bg-white rounded-xl shadow-lg py-4 flex items-start space-y-0 space-x-6 hover:shadow-2xl transform hover:-translate-y-2 transition-transform ease-in duration-200"
>
    <div class="text-left flex-1">
        {#if isSelected}
            <div
                class="absolute top-0 right-0 mr-3 space-x-3 text-xl sm:space-x-1 sm:text-base"
            >
                <button
                    class="hover:scale-150"
                    on:click|preventDefault={() => (isEditable = !isEditable)}>e</button
                >
                <button
                    class="text-red-600 hover:scale-150"
                    on:click|preventDefault={onDelete}>x</button
                >
            </div>
        {/if}

        <div class="">
            <input
                bind:value={exerciseEdit.name}
                on:click={() => (isEditable = true)}
                class="appearance-none bg-transparent text-lg text-black font-semibold focus:outline-none"
                disabled={!isEditable}
            />

            <div class="flex flex-row">
                <div class="">
                    <span>Variables:</span>
                </div>
                <div class="">
                    <ul>
                        {#each exerciseEdit.parameters as parameter}
                            <li class="flex flex-row">
                                <span class="px-1">•</span>
                                <p class="">
                                    {parameter.name}
                                </p>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>

        {#if isEditable && hasChanges}
            <div
                class="absolute bottom-0 right-0 mr-3 mb-1 space-x-3 text-xl sm:space-x-1 sm:text-base"
            >
                <button
                    class="text-green-600 hover:scale-150"
                    on:click|preventDefault={onSave}>Ok</button
                >
            </div>
        {/if}
    </div>
</div>
