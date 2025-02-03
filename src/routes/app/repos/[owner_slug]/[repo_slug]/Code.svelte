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
        Activity,
        Users,
        Tag,
        Box,
        Rocket
    } from 'lucide-svelte';
    import Markdown from '$lib/components/Markdown.svelte';

    // Repository Data (expanded with new fields)
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
        },
        // New metadata
        languages: [
            { name: 'Rust', percentage: 85.4, color: '#dea584' },
            { name: 'TypeScript', percentage: 8.2, color: '#3178c6' },
            { name: 'Other', percentage: 6.4, color: '#ededed' }
        ],
        releases: [
            { version: 'v1.2.0', date: '1 week ago', isLatest: true },
            { version: 'v1.1.0', date: '3 weeks ago' }
        ],
        deployments: [
            { environment: 'production', status: 'active', updatedAt: '1 hour ago' },
            { environment: 'staging', status: 'active', updatedAt: '30 mins ago' }
        ],
        contributors: [
            { username: 'sarah-chen', commits: 432, avatar: 'https://www.gravatar.com/avatar/1?d=mp' },
            { username: 'alex-kumar', commits: 289, avatar: 'https://www.gravatar.com/avatar/2?d=mp' },
            { username: 'maria-garcia', commits: 156, avatar: 'https://www.gravatar.com/avatar/3?d=mp' }
        ],
        packages: [
            { name: 'harbr-core', version: '1.2.0', type: 'cargo' },
            { name: 'harbr-client', version: '1.1.0', type: 'npm' }
        ]
    };


    // file tree structure
    const fileTree = [
      {
        name: 'src',
        type: 'directory',
        children: [
          { name: 'main.rs', type: 'file', size: '2.1 KB' },
          { name: 'lib.rs', type: 'file', size: '1.5 KB' },
          {
            name: 'config',
            type: 'directory',
            children: [
              { name: 'config.toml', type: 'file', size: '0.8 KB' }
            ]
          }
        ]
      },
      {
        name: 'README.md',
        type: 'file',
        size: '4.8 KB'
      },
      {
        name: 'Cargo.toml',
        type: 'file',
        size: '1.2 KB'
      }
    ];

    // Helper functions
    function getFileIcon(filename: string) {
        const ext = filename.split('.').pop();
        switch(ext) {
            case 'rs': return '🦀';
            case 'toml': return '📦';
            case 'md': return '📝';
            default: return '📄';
        }
    }

    let currentBranch = $state('main');
    let showBranchSelector = $state(false);
</script>

<div class="grid grid-cols-12 gap-6 w-full md:grid-cols-12 sm:grid-cols-1">
    <!-- File Browser (2/12 width) -->
    <div class="col-span-3 space-y-4">
        <!-- Branch Selector -->
        <div class="relative">
            <button
                class="w-full px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg
                       text-left flex items-center justify-between hover:bg-zinc-900 transition-colors"
                onclick={() => showBranchSelector = !showBranchSelector}
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
                    <div class="p-2">
                        <button
                            class="w-full px-4 py-2 text-left hover:bg-zinc-800 rounded-lg transition-colors"
                            onclick={() => currentBranch = 'main'}
                        >
                            main
                        </button>
                        <button
                            class="w-full px-4 py-2 text-left hover:bg-zinc-800 rounded-lg transition-colors"
                            onclick={() => currentBranch = 'dev'}
                        >
                            dev
                        </button>
                        <button
                            class="w-full px-4 py-2 text-left hover:bg-zinc-800 rounded-lg transition-colors"
                            onclick={() => currentBranch = 'feature/new-feature'}
                        >
                        </button>
                      </div> 
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

    <!-- Content Area (7/12 width) -->
    <div class="col-span-6 space-y-6">
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
                <Markdown content={repo.readme} />
            </div>
        </div>
    </div>

    <!-- Right Sidebar (3/12 width) -->
    <div class="col-span-3 space-y-6">
        <!-- About -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium">About</h2>
            <p class="text-sm text-zinc-400">{repo.description}</p>
            
            <!-- Topics -->
            <div class="flex flex-wrap gap-2">
                {#each repo.topics as topic}
                    <span class="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                        {topic}
                    </span>
                {/each}
            </div>
        </div>

        <!-- Languages -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium flex items-center gap-2">
                <FileCode size={16} />
                Languages
            </h2>
            <div class="space-y-2">
                {#each repo.languages as lang}
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: {lang.color}"></div>
                            <span>{lang.name}</span>
                        </div>
                        <span class="text-zinc-400">{lang.percentage}%</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Releases -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium flex items-center gap-2">
                <Tag size={16} />
                Releases
            </h2>
            <div class="space-y-3">
                {#each repo.releases as release}
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-2">
                            <span class="font-mono">{release.version}</span>
                            {#if release.isLatest}
                                <span class="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                                    latest
                                </span>
                            {/if}
                        </div>
                        <span class="text-zinc-400">{release.date}</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Deployments -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium flex items-center gap-2">
                <Rocket size={16} />
                Deployments
            </h2>
            <div class="space-y-3">
                {#each repo.deployments as deployment}
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>{deployment.environment}</span>
                        </div>
                        <span class="text-zinc-400">{deployment.updatedAt}</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Contributors -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium flex items-center gap-2">
                <Users size={16} />
                Contributors
            </h2>
            <div class="space-y-3">
                {#each repo.contributors as contributor}
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <img
                                src={contributor.avatar}
                                alt={contributor.username}
                                class="w-6 h-6 rounded-full"
                            />
                            <span class="text-sm">{contributor.username}</span>
                        </div>
                        <span class="text-xs text-zinc-400">{contributor.commits} commits</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Packages -->
        <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 space-y-4">
            <h2 class="font-medium flex items-center gap-2">
                <Box size={16} />
                Packages
            </h2>
            <div class="space-y-3">
                {#each repo.packages as pkg}
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-2">
                            <PackageOpen size={14} />
                            <span>{pkg.name}</span>
                        </div>
                        <span class="text-zinc-400">v{pkg.version}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>