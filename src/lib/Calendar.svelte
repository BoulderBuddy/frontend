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
        const handleChange = () => {
            store.handleDateInput(node.valueAsDate)
        }

        node.addEventListener('input', handleChange)

        return {
            destroy() {
                node.removeEventListener('input', handleChange)
            }
        }
    }
</script>

<input type="date" value={internal} use:valueAsDateConverter />
