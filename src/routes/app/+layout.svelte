<script lang="ts">
  import { page } from '$app/stores';
  import { 
    Home,
    GitFork,
    Star,
    Settings,
    Search,
    X
  } from 'lucide-svelte';
  import Navbar from '$lib/components/AppNavbar.svelte';
  
  let isSidebarOpen = false;
  let isSearchOpen = false;

  const navigationItems = [
    { href: '/app', label: 'Home', icon: Home },
    { href: '/app/repos', label: 'Repositories', icon: GitFork },
    { href: '/app/stars', label: 'Stars', icon: Star },
    { href: '/app/settings', label: 'Settings', icon: Settings }
  ];
</script>

{#if isSearchOpen}
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
    <div class="max-w-2xl mx-auto mt-20 p-4">
      <div class="flex items-center bg-zinc-900 rounded-lg p-3 border border-zinc-800">
        <Search size={20} class="text-zinc-400 mr-3" />
        <input
          type="text"
          placeholder="Search repositories, issues, PRs..."
          class="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
          autofocus
        >
        <button
          class="text-zinc-400 hover:text-white"
          on:click={() => isSearchOpen = false}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  </div>
{/if}

<div class="min-h-screen flex flex-col">
<Navbar></Navbar>
  <!-- Main Layout -->
  <div class="flex-1 flex">
    <!-- Sidebar -->
    <aside class={`fixed top-14 bottom-0 w-64 bg-black border-r border-zinc-800 transform transition-transform duration-200 ease-in-out z-30 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div class="p-4">
        <nav class="space-y-1">
          {#each navigationItems as { href, label, icon: Icon }}
            <a
              {href}
              class="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors {$page.url.pathname === href ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}"
            >
              <svelte:component this={Icon} size={20} />
              {label}
            </a>
          {/each}
        </nav>

        <div class="mt-8">
          <h3 class="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Recent Repositories
          </h3>
          <div class="mt-2 space-y-1">
            {#each ['harbr/core', 'harbr/docs', 'harbr/ui'] as repo}
              <a
                href={`/app/repos/${repo}`}
                class="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
              >
                <GitFork size={16} />
                {repo}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 md:ml-64">
      <div class="">
        <slot />
      </div>
    </main>
  </div>
</div>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isSearchOpen = !isSearchOpen;
    }
  }}
/>