<!-- Header.svelte -->
<script lang="ts">
    import { 
      Home,
      GitFork,
      Star,
      Settings,
      Bell,
      Search,
      Menu,
      X,
      User,
      GitBranch,
      Plus,
      LogOut,
      Blocks,
      Github,
      Book,
      MessageCircle,
      Settings as SettingsIcon
    } from 'lucide-svelte';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let isSidebarOpen = false;
    let isSearchOpen = false;
    let isProfileOpen = false;
    let isNotificationsOpen = false;
    let isCreateOpen = false;
  
    const navigationItems = [
      { href: '/app', label: 'Dashboard', icon: Home },
      { href: '/app/repos', label: 'Repositories', icon: GitFork },
      { href: '/app/stars', label: 'Stars', icon: Star },
      { href: '/app/settings', label: 'Settings', icon: Settings }
    ];
  
    // Example notifications
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
  
    function handle(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const notificationsButton = document.getElementById('notifications-button');
        const notificationsDropdown = document.getElementById('notifications-dropdown');
        const profileButton = document.getElementById('profile-button');
        const profileDropdown = document.getElementById('profile-dropdown');
        const createButton = document.getElementById('create-button');
        const createDropdown = document.getElementById('create-dropdown');

        // Check if click is outside notifications
        if (isNotificationsOpen &&
            !notificationsButton?.contains(target) &&
            !notificationsDropdown?.contains(target)) {
          isNotificationsOpen = false;
        }
    
        // Check if click is outside profile
        if (isProfileOpen &&
            !profileButton?.contains(target) &&
            !profileDropdown?.contains(target)) {
          isProfileOpen = false;
        }
    
        // Check if click is outside create menu
        if (isCreateOpen &&
            !createButton?.contains(target) &&
            !createDropdown?.contains(target)) {
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
  
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        isSearchOpen = !isSearchOpen;
      } else if (event.key === 'Escape') {
        isSearchOpen = false;
        isNotificationsOpen = false;
        isProfileOpen = false;
      }
    }
  </script>
  
  <svelte:window on:keydown={handleKeydown} />
  
  {#if isSearchOpen}
    <div 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      transition:fly={{ duration: 200 }}
    >
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
  
  <header class="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-40 flex-none">
    <div class="flex items-center justify-between px-4 h-14">
      <div class="flex items-center gap-4">
        <button
          class="md:hidden p-2 hover:bg-zinc-800/50 rounded-lg text-zinc-400"
          on:click={() => isSidebarOpen = !isSidebarOpen}
        >
          <Menu size={20} />
        </button>
        <a href="/" class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Harbr
        </a>
      </div>
  
      <button
        class="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900/50 hover:bg-zinc-800 rounded-lg border border-zinc-800 flex-1 mx-8 max-w-lg"
        on:click={() => isSearchOpen = true}
      >
        <Search size={16} />
        <span>Quick search...</span>
        <span class="ml-auto text-zinc-600">⌘K</span>
      </button>
  
      <div class="flex items-center gap-4">
      <!-- Create Button -->
      <div class="relative">
          <button 
            id="create-button"
            class="p-2 hover:bg-zinc-800/50 rounded-lg text-zinc-400 flex items-center gap-2"
            on:click={(e) => {
              e.stopPropagation();
              isCreateOpen = !isCreateOpen;
              isNotificationsOpen = false;
              isProfileOpen = false;
            }}
          >
            <Plus size={20} />
          </button>
      
          {#if isCreateOpen}
            <div
              id="create-dropdown"
              class="absolute right-0 mt-2 w-64 bg-black border border-zinc-800 rounded-lg shadow-xl z-50"
              in:fly={{ y: -10, duration: 200 }}
              out:fly={{ y: -10, duration: 150 }}
              on:click|stopPropagation
            >
              <div class="p-2">
                <a
                  href="/app/new/org"
                  on:click={() => isCreateOpen = false}
                  class="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors group"
                >
                  <div class="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover:border-blue-500/40">
                    <User size={16} class="text-blue-400" />
                  </div>
                  <div>
                    <p class="font-medium text-white">Organization</p>
                    <p class="text-xs text-zinc-500">Collaborate with multiple people</p>
                  </div>
                </a>
              
                <a
                  href="/app/new/repo"
                  on:click={() => isCreateOpen = false}
                  class="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors group mt-1"
                >
                  <div class="p-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40">
                    <GitBranch size={16} class="text-emerald-400" />
                  </div>
                  <div>
                    <p class="font-medium text-white">Repository</p>
                    <p class="text-xs text-zinc-500">Host your code and collaborate</p>
                  </div>
                </a>
              
                <a
                  href="/app/new/service"
                  on:click={() => isCreateOpen = false}
                  class="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors group mt-1"
                >
                  <div class="p-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 group-hover:border-amber-500/40">
                    <Blocks size={16} class="text-amber-400" />
                  </div>
                  <div>
                    <p class="font-medium text-white">Service</p>
                    <p class="text-xs text-zinc-500">Deploy and manage services</p>
                  </div>
                </a>
              </div>
            </div>
          {/if}
        </div>

        <!-- Notifications -->
        <div class="relative">
          <button 
            id="notifications-button"
            class="p-2 hover:bg-zinc-800/50 rounded-lg relative text-zinc-400"
            on:click={toggleNotifications}
          >
            <Bell size={20} />
            {#if notifications.some(n => !n.read)}
              <span class="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
            {/if}
          </button>
  
          {#if isNotificationsOpen}
            <div
              id="notifications-dropdown"
              class="absolute right-0 mt-2 w-96 bg-black border border-zinc-800 rounded-lg shadow-xl z-50"
              transition:fly={{ y: -10, duration: 200 }}
              on:click|stopPropagation
            >
              <div class="p-4 border-b border-zinc-800">
                <div class="flex items-center justify-between">
                  <h3 class="font-medium text-white">Notifications</h3>
                  <a href="/app/notifications" class="text-xs text-emerald-400 hover:text-emerald-300">
                    View all
                  </a>
                </div>
              </div>
              
              <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
                {#each notifications as notification}
                  <div class="p-4 hover:bg-zinc-900/50 border-b border-zinc-800 last:border-0">
                    <div class="flex gap-4">
                      <img
                        src={notification.user.avatar}
                        alt={notification.user.name}
                        class="w-8 h-8 rounded-full bg-zinc-800"
                      />
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
          <button 
            id="profile-button"
            class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            on:click={toggleProfile}
          >
            <span class="sr-only">Profile</span>
          </button>
  
          {#if isProfileOpen}
            <div
              id="profile-dropdown"
              class="absolute right-0 mt-2 w-56 bg-black border border-zinc-800 rounded-lg shadow-xl z-50"
              transition:fly={{ y: -10, duration: 200 }}
              on:click|stopPropagation
            >
              <!-- Profile Header -->
              <div class="p-4 border-b border-zinc-800">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
                  <div>
                    <h3 class="font-medium text-white">John Doe</h3>
                    <p class="text-xs text-zinc-500">john@example.com</p>
                  </div>
                </div>
              </div>
  
              <!-- Menu Items -->
              <div class="p-2">
                <a
                  href="/app/profile"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors"
                >
                  <User size={16} />
                  Your Profile
                </a>
                <a
                  href="/app/stars"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors"
                >
                  <Star size={16} />
                  Your Stars
                </a>
                <a
                  href="/app/repositories"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Your Repositories
                </a>
                <a
                  href="/app/docs"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors"
                >
                  <Book size={16} />
                  Documentation
                </a>
  
                <div class="my-2 border-t border-zinc-800"></div>
  
                <a
                  href="/app/settings"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-lg transition-colors"
                >
                  <SettingsIcon size={16} />
                  Settings
                </a>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </header>