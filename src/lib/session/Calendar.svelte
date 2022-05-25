<script lang="ts">
    import { getContext } from 'svelte'
    import { key, type TrainingSessionStoreWritable } from './session_store'

    let store = getContext<TrainingSessionStoreWritable>(key)

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
