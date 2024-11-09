<!-- RepoSlug.svelte -->
<script lang="ts">
    import { 
      Star,
      GitFork,
      Clock,
      Globe2,
      Lock,
      FileCode,
      GitBranch,
      Eye,
      History,
      Share2,
      FileText,
      MessageCircle,
      AlertCircle,
      PackageOpen,
      Settings,
      Users,
      Infinity,
      ChevronRight,
      Activity
    } from 'lucide-svelte';
    
    import PrimaryButton from '$lib/components/PrimaryButton.svelte';
    import OutlineButton from '$lib/components/OutlineButton.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
  
    // Project Theme (could be fetched from project settings)
    const projectTheme = {
      primaryColor: '#10B981', // Default emerald
      primaryColorHover: '#059669',
      gradientStart: '#065f46',
      gradientEnd: '#064e3b',
      accentTextColor: '#34D399'
    };
  
    // Repository Data
    const repo = {
      name: 'harbr/core',
      fullName: 'Harbr Core',
      description: 'Core functionality and backend services. Built with Rust for maximum performance and reliability.',
      isPrivate: false,
      stars: 1204,
      forks: 234,
      language: 'Rust',
      languageColor: '#dea584',
      lastUpdated: '2 hours ago',
      topics: ['rust', 'git', 'vcs', 'backend'],
      branches: 12,
      watchers: 89,
      commits: 1432,
      openIssues: 23,
      pullRequests: 8,
      readme: `# Harbr Core\n\nCore functionality and backend services...`,
      lastCommit: {
        message: 'feat: Implement new storage engine',
        author: 'Sarah Chen',
        hash: 'a1b2c3d',
        timestamp: '2 hours ago'
      }
    };
  
    // File Tree Structure
    const fileTree = [
      {
        type: 'directory',
        name: 'src',
        children: [
          {
            type: 'directory',
            name: 'core',
            children: [
              { type: 'file', name: 'mod.rs', size: '12.4 KB' },
              { type: 'file', name: 'storage.rs', size: '8.2 KB' }
            ]
          },
          {
            type: 'directory',
            name: 'api',
            children: [
              { type: 'file', name: 'handlers.rs', size: '15.7 KB' },
              { type: 'file', name: 'routes.rs', size: '6.1 KB' }
            ]
          }
        ]
      },
      {
        type: 'directory',
        name: 'tests',
        children: [
          { type: 'file', name: 'integration_tests.rs', size: '4.3 KB' }
        ]
      },
      { type: 'file', name: 'Cargo.toml', size: '1.2 KB' },
      { type: 'file', name: 'README.md', size: '4.8 KB' }
    ];
  
    // Tabs Configuration
    const tabs = [
      { id: 'code', icon: FileCode, label: 'Code' },
      { id: 'issues', icon: AlertCircle, label: 'Issues', count: repo.openIssues },
      { id: 'prs', icon: GitBranch, label: 'Pull Requests', count: repo.pullRequests },
      { id: 'discussions', icon: MessageCircle, label: 'Discussions' },
      { id: 'actions', icon: Activity, label: 'Actions' },
      { id: 'packages', icon: PackageOpen, label: 'Packages' },
      { id: 'security', icon: Lock, label: 'Security' },
      { id: 'insights', icon: Infinity, label: 'Insights' },
      { id: 'settings', icon: Settings, label: 'Settings' }
    ];
  
    let selectedTab = 'code';
    let selectedFile = null;
    
    // Active branch/tag
    let currentBranch = 'main';
    let showBranchSelector = false;
  
    // Helper function for file icons
    function getFileIcon(filename: string) {
      const ext = filename.split('.').pop();
      switch(ext) {
        case 'rs': return '🦀';
        case 'toml': return '📦';
        case 'md': return '📝';
        default: return '📄';
      }
    }
  </script>
  
  <!-- Dynamic project-specific styles -->
  <style>
    .project-gradient {
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    }
    
    .project-hover:hover {
      background-color: var(--primary-hover);
    }
  </style>
  
  <div 
    class="min-h-screen bg-black text-white"
    style="--primary-color: {projectTheme.primaryColor}; 
           --primary-hover: {projectTheme.primaryColorHover};
           --gradient-start: {projectTheme.gradientStart};
           --gradient-end: {projectTheme.gradientEnd};
           --accent-text: {projectTheme.accentTextColor}"
  >
    <!-- Repository Header with Gradient -->
    <div class="project-gradient border-b border-zinc-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-zinc-300/80 text-sm mb-4">
          {#if repo.isPrivate}
            <Lock size={16} class="text-zinc-400" />
          {:else}
            <Globe2 size={16} class="text-zinc-400" />
          {/if}
          <a href="/app/repos" class="hover:text-white transition-colors">Repositories</a>
          <ChevronRight size={16} class="text-zinc-600" />
          <a href="/app/repos/{repo.name}" class="font-medium hover:text-white transition-colors">
            {repo.name}
          </a>
        </div>
  
        <!-- Repository Title & Actions -->
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h1 class="text-3xl font-bold tracking-tight">{repo.fullName}</h1>
            <p class="mt-2 text-lg text-zinc-300/80">{repo.description}</p>
            
            {#if repo.topics.length > 0}
              <div class="mt-4 flex flex-wrap gap-2">
                {#each repo.topics as topic}
                  <span class="px-3 py-1 text-sm rounded-full bg-black/20 text-white/90 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
                    {topic}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
  
          <!-- Action Buttons -->
          <div class="flex gap-3">
            <PrimaryButton>
              <Eye size={16} />
              Watch
              <span class="ml-1 px-2 py-0.5 text-xs bg-black/20 rounded-full">
                {repo.watchers}
              </span>
            </PrimaryButton>
            
            <OutlineButton class="backdrop-blur-sm">
              <Star size={16} />
              Star
              <span class="ml-1 px-2 py-0.5 text-xs bg-black/20 rounded-full">
                {repo.stars}
              </span>
            </OutlineButton>
            
            <OutlineButton class="backdrop-blur-sm">
              <GitFork size={16} />
              Fork
              <span class="ml-1 px-2 py-0.5 text-xs bg-black/20 rounded-full">
                {repo.forks}
              </span>
            </OutlineButton>
          </div>
        </div>
  
        <!-- Navigation Tabs with Blur Effect -->
        <div class="flex mt-8 gap-1 border-b border-white/10 backdrop-blur-sm">
          {#each tabs as tab}
            <button
              class="px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2
                     {selectedTab === tab.id ? 
                       'border-white text-white' : 
                       'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'}"
              on:click={() => selectedTab = tab.id}
            >
              <svelte:component this={tab.icon} size={16} />
              {tab.label}
              {#if tab.count !== undefined}
                <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
                  {tab.count}
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>
  
    <!-- Main Content Area with Glass Effect -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      {#if selectedTab === 'code'}
        <div class="grid grid-cols-4 gap-6">
          <!-- File Browser (1/4 width) -->
          <div class="space-y-4">
            <!-- Branch Selector -->
            <div class="relative">
              <button
                class="w-full px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg
                       text-left flex items-center justify-between hover:bg-zinc-900 transition-colors"
                on:click={() => showBranchSelector = !showBranchSelector}
              >
                <div class="flex items-center gap-2">
                  <GitBranch size={16} />
                  <span class="font-medium">{currentBranch}</span>
                </div>
                <ChevronRight
                  size={16}
                  class="transform transition-transform {showBranchSelector ? 'rotate-90' : ''}"
                />
              </button>
              
              {#if showBranchSelector}
                <div class="absolute top-full left-0 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-lg
                            shadow-lg shadow-black/50 z-10">
                  <!-- Branch list would go here -->
                </div>
              {/if}
            </div>
  
            <!-- File Tree -->
            <div class="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg divide-y divide-zinc-800">
              {#each fileTree as item}
                <div class="p-3 hover:bg-zinc-900 transition-colors cursor-pointer">
                  <div class="flex items-center gap-2">
                    {#if item.type === 'directory'}
                      <span class="text-xl">📁</span>
                    {:else}
                      <span class="text-xl">{getFileIcon(item.name)}</span>
                    {/if}
                    <span class="flex-1 truncate">{item.name}</span>
                    {#if item.type === 'file'}
                      <span class="text-xs text-zinc-500">{item.size}</span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
  
          <!-- Content Area (3/4 width) -->
          <div class="col-span-3 space-y-6">
            <!-- Last Commit Info -->
            <div class="p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800">
              <div class="flex items-center gap-4">
                <img
                  src="https://www.gravatar.com/avatar/0?d=mp"
                  alt="Avatar"
                  class="w-10 h-10 rounded-full bg-zinc-800 ring-2 ring-zinc-700"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-white truncate">{repo.lastCommit.message}</p>
                  <p class="text-sm text-zinc-400">
                    {repo.lastCommit.author} committed {repo.lastCommit.timestamp}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-mono text-zinc-500">{repo.lastCommit.hash}</span>
                  <button class="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <Share2 size={16} class="text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>
  
            <!-- README or File Content -->
            <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
              <div class="prose prose-invert max-w-none">
                <div class="markdown-content">
                  {repo.readme}
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else if selectedTab === 'issues'}
        <!-- Issues View -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
          <!-- Issues content would go here -->
        </div>
      {:else}
        <!-- Other tab content -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
          <p class="text-zinc-400">Content for {selectedTab} tab</p>
        </div>
      {/if}
    </div>
  </div>