# Harbr API JSON Schemas

## ``/app``

Shortcuts

```json
[
    {
      icon: Plus,
      label: 'New Repository',
      href: '/app/repos/new',
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
  ]
```

Activity Feed

```json
[
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
  ```

  Repo List

  ```json
  [
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
  ```

## ``/app/repos/``

Languages
```json
languages = [
    { name: 'All', value: 'all' },
    { name: 'TypeScript', value: 'typescript', color: '#2b7489' },
    { name: 'JavaScript', value: 'javascript', color: '#f1e05a' },
    { name: 'Python', value: 'python', color: '#3572A5' },
    { name: 'Rust', value: 'rust', color: '#dea584' },
    { name: 'Go', value: 'go', color: '#00ADD8' }
  ];
  ```

### -------------------------------------------------------TO BE EXTENDED-----------------------------------------------------


## ``/app/stars/``

Languages
```json
languages = [
    { name: 'All', value: 'all' },
    { name: 'TypeScript', value: 'typescript', color: '#2b7489' },
    { name: 'JavaScript', value: 'javascript', color: '#f1e05a' },
    { name: 'Python', value: 'python', color: '#3572A5' },
    { name: 'Rust', value: 'rust', color: '#dea584' },
    { name: 'Go', value: 'go', color: '#00ADD8' }
  ];
  ```

### -------------------------------------------------------TO BE EXTENDED-----------------------------------------------------


## ``/app/repos/[repoId]``

Languages
```json
languages = [
    { name: 'All', value: 'all' },
    { name: 'TypeScript', value: 'typescript', color: '#2b7489' },
    { name: 'JavaScript', value: 'javascript', color: '#f1e05a' },
    { name: 'Python', value: 'python', color: '#3572A5' },
    { name: 'Rust', value: 'rust', color: '#dea584' },
    { name: 'Go', value: 'go', color: '#00ADD8' }
  ];
```


Repo Data (Code Tab)
```json

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
```

File Tree (Code Tab)

```json
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
```

Actions Data (Actions Tab)

```json
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
```

Discussions Data (Discussions tab)

```json
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
```

Insights Data

```json
  // Insights Data
  const insights = {
    commits: 1432,
    contributors: 25,
    issuesClosed: 200,
    pullRequestsMerged: 150
  };
```

Issues Data

```json
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
```

Packages Data

```json
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
```

Pulll Request Data

```json

<script>
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
```

Project Theme (RepoHeader component)

```json
// Project Theme (could be fetched from project settings)
const projectTheme = {
  primaryColor: '#10B981',
  primaryColorHover: '#059669',
  gradientStart: '#065f46',
  gradientEnd: '#064e3b',
  accentTextColor: '#34D399'
};
```

Repo Data (RepoHeader component)

```json
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
```

Tabs (Optional, RepoHeader Component)

```json
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
```

Security Alert Data

```json
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
```


### -----------------------------------------TO BE EXTENDED WITH REPO API RE-WORK-------------------------------------



