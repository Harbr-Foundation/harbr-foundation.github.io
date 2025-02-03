<script>
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
  
    let isMenuOpen = $state(false);
  
    const navItems = [

        { href: '/app', label: 'App (formerly Dashboard)' },
        { href: '/docs', label: 'Documentation' },
        { href: 'https://github.com/Harbr-Foundation', label: 'Source Code' },
        { href: '/auth', label: 'Log In' }
    ];
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  </script>
  
  <nav class="border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex flex-row flex-shrink-0 items-center">
          <img src="/habr-logo.png" class="max-h-14 pr-4"/>
          <a href="/" class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Harbr
          </a>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            {#each navItems as { href, label }}
              <a
                {href}
                class="text-zinc-400 hover:text-emerald-400 transition-colors {$page.url.pathname === href ? 'text-emerald-400' : ''}"
              >
                {label}
              </a>
            {/each}
          </div>
        </div>
  
        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-zinc-800/50"
          onclick={toggleMenu}
          aria-label="Toggle menu"
        >
        </button>
      </div>
    </div>
  
    <!-- Mobile Navigation -->
    {#if isMenuOpen}
      <div
        class="md:hidden"
        transition:fly={{ y: -20, duration: 200 }}
      >
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-zinc-800">
          {#each navItems as { href, label }}
            <a
              {href}
              class="block px-3 py-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 transition-colors {$page.url.pathname === href ? 'text-emerald-400 bg-zinc-800/50' : ''}"
              onclick={() => isMenuOpen = false}
            >
              {label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </nav>