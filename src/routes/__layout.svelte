<script lang="ts">
    import TopNav from '$lib/nav/TopNav.svelte'
    import SideNav from '$lib/nav/SideNav.svelte'
    import '../app.css'
</script>

<body class="bg-white text-slate-500 ">
    <nav
        class="fixed top-0 z-40 inset-x-0 h-16 font-medium flex justify-between items-center shadow-lg bg-white/50"
    >
        <TopNav />
    </nav>
    <aside
        class="hidden w-64 z-40 fixed top-0 inset-y-0 overflow-x-hidden overflow-y-auto sm:block"
    >
        <SideNav />
    </aside>
    <main class="pt-[5rem] sm:pl-64">
        <slot />
    </main>
</body>
