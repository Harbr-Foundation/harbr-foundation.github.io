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
    Activity,
    Menu // Added for mobile menu
  } from 'lucide-svelte';
  import { Button } from 'flowbite-svelte';
  import { selectedTab } from '$lib/stores/tabStore';
  
  // Add mobile menu state
  let isMobileMenuOpen = $state(false);

  const projectTheme = {
    primaryColor: '#10B981',
    primaryColorHover: '#059669',
    gradientStart: '#065f46',
    gradientEnd: '#064e3b',
    accentTextColor: '#34D399'
  };

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

  const SvelteComponent = $derived(tabs.find(t => t.id === $selectedTab)?.icon);
</script>

<style>
  .project-gradient {
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  }
  
  .project-hover:hover {
    background-color: var(--primary-hover);
  }

  /* Mobile menu styles */
  .mobile-menu {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-menu {
      display: block;
    }
    
    .desktop-tabs {
      display: none;
    }
    
    .mobile-menu-open {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
</style>

<div 
class="pb-10 bg-black text-white w-full"
style="--primary-color: {projectTheme.primaryColor}; 
       --primary-hover: {projectTheme.primaryColorHover};
       --gradient-start: {projectTheme.gradientStart};
       --gradient-end: {projectTheme.gradientEnd};
       --accent-text: {projectTheme.accentTextColor}"
>
<div class="project-gradient border-b border-zinc-800/50 backdrop-blur-sm w-full">
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-zinc-300/80 text-sm mb-4 overflow-x-auto">
      {#if repo.isPrivate}
        <Lock size={16} class="text-zinc-400 flex-shrink-0" />
      {:else}
        <Globe size={16} class="text-zinc-400 flex-shrink-0" />
      {/if}
      <a href="/app/repos" class="hover:text-white transition-colors whitespace-nowrap">Repositories</a>
      <ChevronRight size={16} class="text-zinc-600 flex-shrink-0" />
      <a href="/app/repos/{repo.name}" class="font-medium hover:text-white transition-colors truncate">
        {repo.name}
      </a>
    </div>
    
    <!-- Repository Title & Actions -->
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
      <div class="flex-1">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight break-words">{repo.fullName}</h1>
        <p class="mt-2 text-base md:text-lg text-zinc-300/80">{repo.description}</p>
        
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
      <div class="flex flex-wrap gap-3">
        <Button class="w-full sm:w-auto">
          <div class="flex items-center justify-center gap-2">
            <Eye size={16} />
            <span>Watch</span>
            <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
              {repo.watchers}
            </span>
          </div>
        </Button>

        <Button class="w-full sm:w-auto">
          <div class="flex items-center justify-center gap-2">
            <Star size={16} />
            <span>Star</span>
            <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
              {repo.stars}
            </span>
          </div>
        </Button>

        <Button class="w-full sm:w-auto">
          <div class="flex items-center justify-center gap-2">
            <GitFork size={16} />
            <span>Fork</span>
            <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
              {repo.forks}
            </span>
          </div>
        </Button>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="mobile-menu w-full p-3 text-left border border-white/10 rounded-lg mb-4 flex items-center justify-between"
      onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
    >
      <div class="flex items-center gap-2">
        <SvelteComponent size={16} />
        <span>{tabs.find(t => t.id === $selectedTab)?.label}</span>
      </div>
      <Menu size={16} />
    </button>

    <!-- Desktop Navigation Tabs -->
    <div class="desktop-tabs flex gap-1 border-b border-white/10 backdrop-blur-sm overflow-x-auto">
      {#each tabs as tab}
        <button
          class="px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap
                 {$selectedTab === tab.id ? 
                   'border-white text-white' : 
                   'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'}"
          onclick={() => $selectedTab = tab.id}
        >
          <tab.icon size={16} />
          {tab.label}
          {#if tab.count !== undefined}
            <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
              {tab.count}
            </span>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
      <div class="mobile-menu-open border border-white/10 rounded-lg mt-2">
        {#each tabs as tab}
          <button
            class="w-full px-4 py-3 text-sm font-medium transition-all flex items-center gap-2
                   {$selectedTab === tab.id ? 
                     'bg-white/10 text-white' : 
                     'text-zinc-400 hover:text-white hover:bg-white/5'}"
            onclick={() => {
              $selectedTab = tab.id;
              isMobileMenuOpen = false;
            }}
          >
            <tab.icon size={16} />
            {tab.label}
            {#if tab.count !== undefined}
              <span class="px-2 py-0.5 text-xs bg-black/20 rounded-full">
                {tab.count}
              </span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
</div>