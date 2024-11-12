<script lang="ts">
    import { 
    Star,
    GitFork,
    Globe2,
    Lock,
    FileCode,
    GitBranch,
    Eye,
    Share2,
    FileText,
    MessageCircle,
    AlertCircle,
    PackageOpen,
    Settings,
    Infinity,
    ChevronRight,
    Activity
  } from 'lucide-svelte';
  import Markdown from '$lib/components/Markdown.svelte';

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

  // Active branch/tag
  let currentBranch = 'main';
  let showBranchSelector = false;
</script>

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