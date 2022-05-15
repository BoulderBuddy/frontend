<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    export const load: Load = ({ error, status }) => {
        return {
            props: {
                title: `${status}: ${error.message}`
            }
        }
    }
</script>

<script lang="ts">
    export let title: string
</script>

<div class="error">
    <h1>{title}</h1>

    <img src="/broke.jpg" alt="Person dancing" />
</div>
