<script lang="ts" context="module">
</script>

<script lang="ts">
    import type { ExerciseDisplay } from '$lib/models/frontend'
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
    class="border-2 max-w-full px-8 bg-white rounded-xl shadow-lg py-4 space-y-0 space-x-6 hover:shadow-2xl transform hover:-translate-y-2 transition-transform ease-in duration-200"
>
    <div class="text-left flex items-start max-w-full">
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

        <div class="max-w-full">
            {#if isEditable}
                <input
                    type="text"
                    bind:value={exerciseEdit.name}
                    on:click={() => (isEditable = true)}
                    class="break-normal appearance-none bg-transparent max-w-full text-lg text-black font-semibold focus:outline-none"
                    disabled={!isEditable}
                />
            {:else}
                <p
                    class="appearance-none bg-transparent max-w-full text-lg text-black font-semibold"
                >
                    {exerciseEdit.name}
                </p>
            {/if}

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
