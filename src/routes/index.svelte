<script context="module" lang="ts">
    export const prerender = true
</script>

<script lang="ts">
    import Counter from '$lib/Counter.svelte'
    import { globalUserApi } from '$lib/api'

    let number = 1
    $: user_promise = globalUserApi.get(number)

    let creator = globalUserApi.create({ email: 'user@example.com' })
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>
        <div class="welcome">
            <picture>
                <source srcset="svelte-welcome.webp" type="image/webp" />
                <img src="svelte-welcome.png" alt="Welcome" />
            </picture>
        </div>

        to your new<br />SvelteKit app
    </h1>

    <h2>
        {#await user_promise}
            Wachten dan
        {:then user}
            Mooi man je naam is {user.first_name}
            {user.surname}
            <br />GDPR schending: {user.email}
        {:catch error}
            Gloeiende god: {error.message}
        {/await}
    </h2>

    <h2>
        {#await creator}
            Wachten dan
        {:then user}
            Mooi man je naam is {user.first_name}
            {user.surname}
            <br />GDPR schending: {user.email}
        {:catch error}
            Gloeiende god: {error.message}
        {/await}
    </h2>

    <Counter bind:count={number} />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
