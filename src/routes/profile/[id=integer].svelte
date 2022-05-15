<script lang="ts">
    import type { User } from '$lib/model'

    export let user: User
</script>

<svelte:head>
    <title>{user.first_name}</title>
</svelte:head>

<div>
    <span>Name: {user.first_name} {user.surname}</span>
    <span>Email: {user.email}</span>
</div>
