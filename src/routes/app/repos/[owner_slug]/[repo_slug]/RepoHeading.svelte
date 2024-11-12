<script>
    import PrimaryButton from '$lib/components/PrimaryButton.svelte';
    import OutlineButton from '$lib/components/OutlineButton.svelte';
    import { 
      Star,
      GitFork,
      Globe,
      Lock,
      FileCode,
      GitBranch,
      Eye,
      MessageCircle,
      AlertCircle,
      PackageOpen,
      Settings,
      Infinity,
      ChevronRight,
      Activity
    } from 'lucide-svelte';
    import { Button } from 'flowbite-svelte';
    import { selectedTab } from '$lib/stores/tabStore';
  
    // Project Theme (could be fetched from project settings)
    const projectTheme = {
      primaryColor: '#10B981',
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
  </script>

  <style>
    .project-gradient {
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    }
    
    .project-hover:hover {
      background-color: var(--primary-hover);
    }
  </style>
  
  <div 
    class="pb-10 bg-black text-white"
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
            <Globe size={16} class="text-zinc-400" />
          {/if}
          <a href="/app/repos" class="hover:text-white transition-colors">Repositories</a>
          <ChevronRight size={16} class="text-zinc-600" />
          <a href="/app/repos/{repo.name}" class="font-medium hover:text-white transition-colors">
            {repo.name}
          </a>
        </div>
        
        <!-- Repository Title & Actions -->
        <div class="flex items-start justify-between mb-8">
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
          <div class="flex gap-3 ml-4">
            <Button>
              <div class="flex items-center gap-2">
                <Eye size={16} />
                <span>Watch</span>
                <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
                  {repo.watchers}
                </span>
              </div>
            </Button>
  
            <Button>
              <div class="flex items-center gap-2">
                <Star size={16} />
                <span>Star</span>
                <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
                  {repo.stars}
                </span>
              </div>
            </Button>
  
            <Button>
              <div class="flex items-center gap-2">
                <GitFork size={16} />
                <span>Fork</span>
                <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
                  {repo.forks}
                </span>
              </div>
            </Button>
          </div>
        </div>
    
        <!-- Navigation Tabs with Blur Effect -->
        <div class="flex gap-1 border-b border-white/10 backdrop-blur-sm">
          {#each tabs as tab}
            <button
              class="px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2
                     {$selectedTab === tab.id ? 
                       'border-white text-white' : 
                       'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'}"
              on:click={() => $selectedTab = tab.id}
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
  </div>