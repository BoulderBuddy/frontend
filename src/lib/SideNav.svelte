<script lang="ts">
    import { page } from '$app/stores'

    const default_matcher = (path: string, href) => {
        return path === href
    }
    const blabla_matcher = (path: string, href) => {
        return path.includes(href)
    }

    export const pages = [
        { href: '/', title: 'Home', matcher: default_matcher },
        { href: '/profile', title: 'Profile', matcher: blabla_matcher },
        { href: '/exercises', title: 'Exercises', matcher: default_matcher }
    ]

    console.log($page)
</script>

<div class="w-full max-h-screen border-r shadow-md">
    <div class="w-full flex-initial flex-col bg-white overflow-hidden">
        <ul class="flex flex-col">
            {#each pages as blabla}
                <li>
                    <a
                        sveltekit:prefetch
                        class="flex h-12 w-full hover:text-gray-800 {blabla.matcher(
                            $page.url.pathname,
                            blabla.href
                        )
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-transparent text-gray-500'}"
                        href={blabla.href}
                    >
                        <div
                            class="flex-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200"
                        >
                            <div class="w-1/5 h-full" />
                            <span class="text-lg font-medium">{blabla.title}</span>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
</style>
