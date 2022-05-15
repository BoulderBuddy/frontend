<script lang="ts">
    import type { UserCreate } from '$lib/model'

    function validate(user: UserCreate) {
        return user.email == ''
    }

    let user: UserCreate = { email: '' }
</script>

<form action="/profile" method="post">
    <input
        bind:value={user.first_name}
        name="first_name"
        placeholder="Harold"
        type="text"
    />
    <input
        bind:value={user.surname}
        name="surname"
        placeholder="Haroldsson"
        type="text"
    />
    <input
        bind:value={user.email}
        name="email"
        placeholder="name@example.com"
        type="text"
    />
    <button class="btn" disabled={validate(user)} type="submit">Register</button>
</form>
