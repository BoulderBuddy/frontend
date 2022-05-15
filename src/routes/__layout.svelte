<script lang="ts">
    import Header from '$lib/header/Header.svelte'
    import SideNav from '$lib/SideNav.svelte'
    import '../app.css'
</script>

<body class="bg-white text-slate-500 ">
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-row h-screen">
            <div class="hidden flex-initial w-56 sm:flex">
                <SideNav />
            </div>
            <div class="flex flex-1">
                <slot />
            </div>
        </div>
    </div>
</body>

<style>
</style>
