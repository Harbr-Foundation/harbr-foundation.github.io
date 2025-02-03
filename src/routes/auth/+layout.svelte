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
  import Navbar from '$lib/components/Navbar.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  
  let isSidebarOpen = false;
  let isSearchOpen = $state(false);

  const navigationItems = [
    { href: '/app', label: 'Dashboard', icon: Home },
    { href: '/app/repos', label: 'Repositories', icon: GitFork },
    { href: '/app/stars', label: 'Stars', icon: Star },
    { href: '/app/settings', label: 'Settings', icon: Settings }
  ];

  const children_render = $derived(children);
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
          onclick={() => isSearchOpen = false}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  </div>
{/if}

<div class="min-h-screen flex flex-col overflow-hidden">
<Navbar></Navbar>
  <!-- Main content -->
  <main class="justify-center">
      {@render children_render?.()}
  </main>
</div>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      isSearchOpen = !isSearchOpen;
    }
  }}
/>