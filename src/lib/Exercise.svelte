<script lang="ts">
    import type { ExerciseDisplay } from './frontend_models'

    export let exercise: ExerciseDisplay
</script>

<div
    class="border-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
>
    <div class="text-center space-y-2 sm:text-left flex-1">
        <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">{exercise.name}</p>
            <div class="flex-1 flex flex-row">
                <div class="flex-1">
                    <p>Variables:</p>
                </div>
                <div class="justify-self-end">
                    <ul>
                        {#each exercise.parameters as parameter}
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
    </div>
</div>
