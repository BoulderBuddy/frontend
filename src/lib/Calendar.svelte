<script lang="ts">
    import { getContext } from 'svelte'
    import { key, type TrainingSessionStore } from '$lib/session_store'
    import type { Writable } from 'svelte/store'

    let store = getContext<Writable<TrainingSessionStore>>(key)

    {
        $store
    }

    $: internal = $store.currentDate.toLocaleDateString('en-CA')

    function valueAsDateConverter(node: HTMLInputElement) {
        node.addEventListener('input', function () {
            store.handleDateInput(node.valueAsDate)
        })
    }
</script>

<input type="date" value={internal} use:valueAsDateConverter />
