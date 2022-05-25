<script lang="ts">
    import { page } from '$app/stores'

    const default_matcher = (path: string, href) => {
        return path === href
    }
    const include_matcher = (path: string, href) => {
        return path.includes(href)
    }

    export const pages = [
        { href: '/', title: 'Home', matcher: default_matcher },
        { href: '/profile', title: 'Profile', matcher: include_matcher },
        { href: '/exercises', title: 'Exercises', matcher: default_matcher }
    ]
</script>

<div class="w-full h-screen max-h-screen border-r shadow-md">
    <div class="w-full flex-initial flex-col bg-white overflow-hidden">
        <div class="h-16 flex justify-center items-center">
            <h1 class="text-3xl uppercase text-indigo-500">B_BUDDY</h1>
        </div>
        <ul class="flex flex-col">
            {#each pages as pageUnit}
                <li>
                    <a
                        sveltekit:prefetch
                        class="flex h-12 w-full hover:text-gray-800 {pageUnit.matcher(
                            $page.url.pathname,
                            pageUnit.href
                        )
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-transparent text-gray-500'}"
                        href={pageUnit.href}
                    >
                        <div
                            class="flex-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200"
                        >
                            <div class="w-1/5 h-full" />
                            <span class="text-lg font-medium">{pageUnit.title}</span>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
</style>
