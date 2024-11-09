<script lang="ts">
  import { 
    GitFork,
    Star,
    GitPullRequest,
    MessageSquare,
    Clock,
    Plus,
    BookOpen,
    Users,
    Package
  } from 'lucide-svelte';  // Changed to lucide-svelte

  const repositories = [
    {
      name: 'harbr/core',
      description: 'Core functionality and backend services',
      stars: 1204,
      forks: 234,
      language: 'TypeScript',
      languageColor: '#2b7489',
      lastUpdated: '2 hours ago'
    },
    {
      name: 'harbr/ui',
      description: 'React component library and design system',
      stars: 892,
      forks: 156,
      language: 'JavaScript',
      languageColor: '#f1e05a',
      lastUpdated: '5 hours ago'
    },
    {
      name: 'harbr/docs',
      description: 'Official documentation and guides',
      stars: 345,
      forks: 89,
      language: 'MDX',
      languageColor: '#ff5733',
      lastUpdated: '1 day ago'
    }
  ];

  const activityFeed = [
    {
      type: 'pr-merged',
      repo: 'harbr/core',
      title: 'Add new caching layer for better performance',
      number: '#234',
      time: '30 minutes ago',
      icon: GitPullRequest,
      iconColor: 'text-purple-400'
    },
    {
      type: 'issue-opened',
      repo: 'harbr/ui',
      title: 'Dialog component accessibility improvements',
      number: '#192',
      time: '2 hours ago',
      icon: MessageSquare,
      iconColor: 'text-emerald-400'
    },
    {
      type: 'repo-starred',
      repo: 'harbr/docs',
      title: 'Repository starred',
      time: '4 hours ago',
      icon: Star,
      iconColor: 'text-yellow-400'
    }
  ];

  const shortcuts = [
    {
      icon: Plus,
      label: 'New Repository',
      href: '/app/new',
      description: 'Create a new repository'
    },
    {
      icon: BookOpen,
      label: 'Documentation',
      href: '/docs',
      description: 'View guides and API docs'
    },
    {
      icon: Users,
      label: 'Teams',
      href: '/app/teams',
      description: 'Manage your teams'
    },
    {
      icon: Package,
      label: 'Packages',
      href: '/app/packages',
      description: 'View published packages'
    }
  ];
</script>

<div class="space-y-8">
  <!-- Shortcuts Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each shortcuts as { icon: Icon, label, href, description }}
      <a
        {href}
        class="group p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-emerald-500/50 transition-all hover:-translate-y-0.5"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
            <svelte:component this={Icon} size={20} />
          </div>
          <div>
            <h3 class="font-medium text-white">{label}</h3>
            <p class="text-sm text-zinc-400">{description}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <!-- Repository Grid -->
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-white">Your Repositories</h2>
      <a
        href="/app/repos"
        class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        View all
      </a>
    </div>
    <div class="grid gap-4">
      {#each repositories as repo}
        <div class="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-emerald-500/50 transition-all">
          <div class="flex items-start justify-between">
            <div>
              <a
                href={`/app/repos/${repo.name}`}
                class="text-lg font-medium text-white hover:text-emerald-400 transition-colors"
              >
                {repo.name}
              </a>
              <p class="mt-1 text-sm text-zinc-400">{repo.description}</p>
            </div>
            <a
              href={`/app/repos/${repo.name}/star`}
              class="p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              <Star size={20} />
            </a>
          </div>
          <div class="mt-4 flex items-center gap-4 text-sm">
            <div class="flex items-center gap-1">
              <span class="w-3 h-3 rounded-full" style="background-color: {repo.languageColor}"></span>
              <span class="text-zinc-400">{repo.language}</span>
            </div>
            <div class="flex items-center gap-1 text-zinc-400">
              <Star size={16} />
              {repo.stars}
            </div>
            <div class="flex items-center gap-1 text-zinc-400">
              <GitFork size={16} />
              {repo.forks}
            </div>
            <div class="flex items-center gap-1 text-zinc-400">
              <Clock size={16} />
              {repo.lastUpdated}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Activity Feed -->
  <div>
    <h2 class="text-xl font-semibold text-white mb-4">Recent Activity</h2>
    <div class="space-y-4">
      {#each activityFeed as activity}
        <div class="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <div class="p-2 rounded-lg bg-zinc-800/50 {activity.iconColor}">
            <svelte:component this={activity.icon} size={20} />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <a href={`/app/repos/${activity.repo}`} class="text-zinc-400 hover:text-white transition-colors">
                {activity.repo}
              </a>
              {#if activity.number}
                <span class="text-zinc-600">{activity.number}</span>
              {/if}
            </div>
            <p class="mt-1 text-white font-medium">{activity.title}</p>
            <p class="mt-1 text-sm text-zinc-500">{activity.time}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>