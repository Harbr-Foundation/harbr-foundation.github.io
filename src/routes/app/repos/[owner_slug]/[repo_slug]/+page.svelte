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
  import Markdown from '$lib/components/Markdown.svelte';

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
      // Issues Data
      const issues = [
    {
      id: 1,
      title: 'Bug: Fix memory leak in storage engine',
      author: 'John Doe',
      labels: ['bug', 'high priority'],
      comments: 5,
      createdAt: '2023-10-01T12:34:56Z'
    },
    {
      id: 2,
      title: 'Feature: Add support for new authentication method',
      author: 'Jane Smith',
      labels: ['enhancement'],
      comments: 2,
      createdAt: '2023-10-02T08:22:33Z'
    }
  ];
  // Pull Requests Data
  const pullRequests = [
    {
      id: 1,
      title: 'Add new storage engine',
      author: 'Sarah Chen',
      status: 'open',
      comments: 3,
      createdAt: '2023-10-01T14:22:11Z'
    },
    {
      id: 2,
      title: 'Refactor authentication module',
      author: 'Michael Brown',
      status: 'merged',
      comments: 1,
      createdAt: '2023-10-03T09:15:44Z'
    }
  ];
  // Discussions Data
  const discussions = [
    {
      id: 1,
      title: 'How to optimize Rust code for performance?',
      author: 'Alice Johnson',
      comments: 10,
      createdAt: '2023-09-30T10:00:00Z'
    },
    {
      id: 2,
      title: 'Best practices for API design',
      author: 'Bob Lee',
      comments: 7,
      createdAt: '2023-10-01T11:45:22Z'
    }
  ];
  // Actions Data
  const actions = [
    {
      id: 1,
      name: 'Build and Test',
      status: 'success',
      duration: '5m 32s',
      createdAt: '2023-10-04T07:30:00Z'
    },
    {
      id: 2,
      name: 'Deploy to Production',
      status: 'failure',
      duration: '3m 45s',
      createdAt: '2023-10-04T08:00:00Z'
    }
  ];
  // Packages Data
  const packages = [
    {
      id: 1,
      name: 'harbr-core',
      version: '1.0.0',
      downloads: 1200,
      createdAt: '2023-09-25T12:00:00Z'
    },
    {
      id: 2,
      name: 'harbr-api',
      version: '0.9.1',
      downloads: 800,
      createdAt: '2023-09-28T15:30:00Z'
    }
  ];
  // Security Data
  const securityAlerts = [
    {
      id: 1,
      title: 'Vulnerability in dependency xyz',
      severity: 'high',
      createdAt: '2023-10-02T10:00:00Z'
    },
    {
      id: 2,
      title: 'Potential XSS attack vector',
      severity: 'medium',
      createdAt: '2023-10-03T14:22:00Z'
    }
  ];
  // Insights Data
  const insights = {
    commits: 1432,
    contributors: 25,
    issuesClosed: 200,
    pullRequestsMerged: 150
  };
  // Settings Data
  const settings = {
    repositoryName: 'harbr/core',
    defaultBranch: 'main',
    visibility: 'public',
    topics: ['rust', 'backend', 'vcs']
  };
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
          <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden">
            <div class="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <FileText size={16} class="text-zinc-400" />
                <span class="font-medium">README.md</span>
              </div>
              <div class="text-sm text-zinc-500">{repo.fileTree?.find(f => f.name === 'README.md')?.size || '4.8 KB'}</div>
            </div>
            <div class="p-6">
              Content:
              <Markdown content={repo.readme} />
            </div>
          </div>
        </div>
      </div>
    {:else if selectedTab === 'issues'}
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each issues as issue}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{issue.title}</h3>
            <p class="text-sm text-zinc-400">Opened by {issue.author} on {new Date(issue.createdAt).toLocaleDateString()}</p>
            <div class="flex gap-2 mt-2">
              {#each issue.labels as label}
                <span class="px-2 py-1 text-xs bg-zinc-700 rounded-full">{label}</span>
              {/each}
            </div>
            <p class="text-sm text-zinc-400 mt-2">{issue.comments} comments</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'prs'}
      <!-- Pull Requests Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each pullRequests as pr}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{pr.title}</h3>
            <p class="text-sm text-zinc-400">Opened by {pr.author} on {new Date(pr.createdAt).toLocaleDateString()}</p>
            <p class="text-sm text-zinc-400 mt-2">{pr.comments} comments</p>
            <p class="text-sm text-zinc-400 mt-2">Status: {pr.status}</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'discussions'}
      <!-- Discussions Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each discussions as discussion}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{discussion.title}</h3>
            <p class="text-sm text-zinc-400">Started by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}</p>
            <p class="text-sm text-zinc-400 mt-2">{discussion.comments} comments</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'actions'}
      <!-- Actions Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each actions as action}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{action.name}</h3>
            <p class="text-sm text-zinc-400">Status: {action.status}</p>
            <p class="text-sm text-zinc-400 mt-2">Duration: {action.duration}</p>
            <p class="text-sm text-zinc-400 mt-2">Run at: {new Date(action.createdAt).toLocaleDateString()}</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'packages'}
      <!-- Packages Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each packages as pkg}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{pkg.name}</h3>
            <p class="text-sm text-zinc-400">Version: {pkg.version}</p>
            <p class="text-sm text-zinc-400 mt-2">Downloads: {pkg.downloads}</p>
            <p class="text-sm text-zinc-400 mt-2">Published on: {new Date(pkg.createdAt).toLocaleDateString()}</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'security'}
      <!-- Security Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
        {#each securityAlerts as alert}
          <div class="p-4 bg-zinc-800 rounded-lg">
            <h3 class="text-lg font-medium">{alert.title}</h3>
            <p class="text-sm text-zinc-400">Severity: {alert.severity}</p>
            <p class="text-sm text-zinc-400 mt-2">Reported on: {new Date(alert.createdAt).toLocaleDateString()}</p>
          </div>
        {/each}
      </div>
    {:else if selectedTab === 'insights'}
      <!-- Insights Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
        <h3 class="text-lg font-medium">Repository Insights</h3>
        <p class="text-sm text-zinc-400 mt-2">Commits: {insights.commits}</p>
        <p class="text-sm text-zinc-400 mt-2">Contributors: {insights.contributors}</p>
        <p class="text-sm text-zinc-400 mt-2">Issues Closed: {insights.issuesClosed}</p>
        <p class="text-sm text-zinc-400 mt-2">Pull Requests Merged: {insights.pullRequestsMerged}</p>
      </div>
    {:else if selectedTab === 'settings'}
      <!-- Settings Tab Content -->
      <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
        <h3 class="text-lg font-medium">Repository Settings</h3>
        <p class="text-sm text-zinc-400 mt-2">Name: {settings.repositoryName}</p>
        <p class="text-sm text-zinc-400 mt-2">Default Branch: {settings.defaultBranch}</p>
        <p class="text-sm text-zinc-400 mt-2">Visibility: {settings.visibility}</p>
        <div class="mt-2">
          <h4 class="text-sm font-medium text-zinc-400">Topics:</h4>
          <div class="flex gap-2 mt-1">
            {#each settings.topics as topic}
              <span class="px-2 py-1 text-xs bg-zinc-700 rounded-full">{topic}</span>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>