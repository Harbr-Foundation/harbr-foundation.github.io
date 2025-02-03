<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import { Home, GitFork, Star, Settings, Bell, Search, Menu, X, User, GitBranch, Plus, LogOut, Blocks, Github, Book, MessageCircle, Settings as SettingsIcon } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isSidebarOpen = $state(false);
  let isSearchOpen = $state(false);
let searchOpenedBy: 'keyboard' | 'click' | null = $state(null);
  let isProfileOpen = $state(false);
  let isNotificationsOpen = $state(false);
  let isCreateOpen = $state(false);

  const navigationItems = [
    { href: '/app', label: 'Dashboard', icon: Home },
    { href: '/app/repos', label: 'Repositories', icon: GitFork },
    { href: '/app/stars', label: 'Stars', icon: Star },
    { href: '/app/settings', label: 'Settings', icon: Settings }
  ];

  const notifications = [
    {
      id: 1,
      type: 'pr',
      title: 'Pull request review requested',
      message: 'Review requested on PR #123: "Add new storage engine"',
      repo: 'harbr/core',
      time: '5m ago',
      read: false,
      user: {
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      }
    },
    {
      id: 2,
      type: 'issue',
      title: 'New issue mentioned you',
      message: 'You were mentioned in issue #45: "Update documentation"',
      repo: 'harbr/docs',
      time: '2h ago',
      read: true,
      user: {
        name: 'Alex Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
      }
    }
  ];

  const profileMenuItems = [
    { href: '/app/profile', label: 'Your Profile', icon: User },
    { href: '/app/stars', label: 'Your Stars', icon: Star },
    { href: '/app/repos', label: 'Your Repositories', icon: Github },
    { href: '/app/docs', label: 'Documentation', icon: Book },
    { href: '/app/settings', label: 'Settings', icon: SettingsIcon },
    { href: '#', label: 'Sign Out', icon: LogOut, isButton: true }
  ];

  const createMenuItems = [
    { 
        href: '/app/new/org', 
        label: 'Organization', 
        icon: User, 
        description: 'Collaborate with multiple people',
        gradientClasses: 'bg-gradient-to-br from-blue-500/10 to-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40 text-blue-400'
    },
    { 
        href: '/app/repos/new', 
        label: 'Repository', 
        icon: GitBranch, 
        description: 'Host your code and collaborate',
        gradientClasses: 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40 text-emerald-400'
    },
    { 
        href: '/app/new/service', 
        label: 'Service', 
        icon: Blocks, 
        description: 'Deploy and manage services',
        gradientClasses: 'bg-gradient-to-br from-zinc-500/10 to-zinc-500/10 border-zinc-500/20 group-hover:border-zinc-500/40 text-zinc-400'
    }
  ];

  function handle(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const notificationsButton = document.getElementById('notifications-button');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    const createButton = document.getElementById('create-button');
    const createDropdown = document.getElementById('create-dropdown');

    if (isNotificationsOpen && !notificationsButton?.contains(target) && !notificationsDropdown?.contains(target)) {
      isNotificationsOpen = false;
    }

    if (isProfileOpen && !profileButton?.contains(target) && !profileDropdown?.contains(target)) {
      isProfileOpen = false;
    }

    if (isCreateOpen && !createButton?.contains(target) && !createDropdown?.contains(target)) {
      isCreateOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  });

  function toggleNotifications(event: MouseEvent) {
    event.stopPropagation();
    isNotificationsOpen = !isNotificationsOpen;
    if (isNotificationsOpen) {
      isProfileOpen = false;
      isCreateOpen = false;
    }
  }

  function toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    isProfileOpen = !isProfileOpen;
    if (isProfileOpen) {
      isNotificationsOpen = false;
      isCreateOpen = false;
    }
  }

  function toggleCreate(event: MouseEvent) {
    event.stopPropagation();
    isCreateOpen = !isCreateOpen;
    if (isCreateOpen) {
      isNotificationsOpen = false;
      isProfileOpen = false;
    }
  }

  let lastKeyTime = 0;
  const DEBOUNCE_TIME = 100; // 100ms debounce

  function handleKeydown(event: KeyboardEvent) {
    const now = Date.now();
    
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      
      // Check if enough time has passed since last keypress
      if (now - lastKeyTime > DEBOUNCE_TIME) {
        isSearchOpen = !isSearchOpen;
        lastKeyTime = now;
      }
    } else if (event.key === 'Escape') {
      isSearchOpen = false;
      isNotificationsOpen = false;
      isProfileOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Search Modal -->
{#if isSearchOpen}
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" transition:fly={{ duration: 200 }}>
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
          onclick={() => {
            isSearchOpen = false;
            searchOpenedBy = null;
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  </div>
{/if}

<header class="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-40 flex-none">
  <div class="flex items-center justify-between px-4 h-14">
    <div class="flex items-center gap-4">
      <button class="md:hidden p-2 hover:bg-zinc-800/50 rounded-lg text-zinc-400" onclick={() => isSidebarOpen = !isSidebarOpen}>
        <Menu size={20} />
      </button>
      <a href="/" class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Harbr</a>
    </div>

    <!-- Search Button (not an input field) -->
    <button 
      class="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900/50 hover:bg-zinc-800 rounded-lg border border-zinc-800 flex-1 mx-8 max-w-lg" 
      onclick={() => {
        if (!isSearchOpen || searchOpenedBy === 'click') {
          isSearchOpen = true;
          searchOpenedBy = 'click';
        }
      }}
    >
      <Search size={16} />
      <span>Quick search...</span>
      <span class="ml-auto text-zinc-600">⌘K</span>
    </button>

    <div class="flex items-center gap-4">
      <!-- Create Button -->
      <div class="relative">
        <button id="create-button" class="p-2 hover:bg-zinc-800/50 rounded-lg text-zinc-400 flex items-center gap-2" onclick={toggleCreate}>
          <Plus size={20} />
        </button>

        {#if isCreateOpen}
          <div id="create-dropdown" class="absolute right-0 mt-2 w-64 bg-black border border-zinc-800 rounded-lg shadow-xl z-50" in:fly={{ y: -10, duration: 200 }} out:fly={{ y: -10, duration: 150 }} onclick={stopPropagation(bubble('click'))}>
            <div class="p-2">
              {#each createMenuItems as item}
                <a href={item.href} onclick={() => isCreateOpen = false} class="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors group mt-1">
                  <div class="p-2 rounded-lg {item.gradientClasses} border">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p class="font-medium text-white">{item.label}</p>
                    <p class="text-xs text-zinc-500">{item.description}</p>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Notifications -->
      <div class="relative">
        <button id="notifications-button" class="p-2 hover:bg-zinc-800/50 rounded-lg relative text-zinc-400" onclick={toggleNotifications}>
          <Bell size={20} />
          {#if notifications.some(n => !n.read)}
            <span class="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
          {/if}
        </button>

        {#if isNotificationsOpen}
          <div id="notifications-dropdown" class="absolute right-0 mt-2 w-96 bg-black border border-zinc-800 rounded-lg shadow-xl z-50" transition:fly={{ y: -10, duration: 200 }} onclick={stopPropagation(bubble('click'))}>
            <div class="p-4 border-b border-zinc-800">
              <div class="flex items-center justify-between">
                <h3 class="font-medium text-white">Notifications</h3>
                <a href="/app/notifications" class="text-xs text-emerald-400 hover:text-emerald-300">View all</a>
              </div>
            </div>

            <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
              {#each notifications as notification}
                <div class="p-4 hover:bg-zinc-900/50 border-b border-zinc-800 last:border-0">
                  <div class="flex gap-4">
                    <img src={notification.user.avatar} alt={notification.user.name} class="w-8 h-8 rounded-full bg-zinc-800" />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-white">{notification.title}</p>
                      <p class="text-sm text-zinc-400 mt-0.5">{notification.message}</p>
                      <div class="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                        <span>{notification.repo}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    {#if !notification.read}
                      <div class="w-2 h-2 mt-2 bg-emerald-400 rounded-full"></div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Profile -->
      <div class="relative">
        <button id="profile-button" class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" onclick={toggleProfile}>
          <span class="sr-only">Profile</span>
        </button>

        {#if isProfileOpen}
          <div id="profile-dropdown" class="absolute right-0 mt-2 w-56 bg-black border border-zinc-800 rounded-lg shadow-xl z-50" transition:fly={{ y: -10, duration: 200 }} onclick={stopPropagation(bubble('click'))}>
            <div class="p-4 border-b border-zinc-800">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
                <div>
                  <h3 class="font-medium text-white">John Doe</h3>
                  <p class="text-xs text-zinc-500">john@example.com</p>
                </div>
              </div>
            </div>

            <div class="p-2">
              {#each profileMenuItems as item}
                {#if item.isButton}
                  <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                    <item.icon size={16} />
                    {item.label}
                  </button>
                {:else}
                  <a href={item.href} class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors">
                    <item.icon size={16} />
                    {item.label}
                  </a>
                {/if}
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>