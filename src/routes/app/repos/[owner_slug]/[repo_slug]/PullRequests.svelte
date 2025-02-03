<script>
  import {
    Search,
    Filter,
    ArrowUp,
    MessageCircle,
    Clock,
    GitPullRequest,
    CheckCircle2,
    AlertCircle,
    GitMerge,
    Plus,
    GitBranch,
    CircleDot,
    Check,
    X,
    GitCommit,
  } from "lucide-svelte";
  import { Button } from "flowbite-svelte";

  // PR Status Types
  const statusTypes = [
    { id: "open", name: "Open", color: "#34D399", icon: GitPullRequest },
    { id: "merged", name: "Merged", color: "#818CF8", icon: GitMerge },
    { id: "closed", name: "Closed", color: "#F87171", icon: X },
    { id: "draft", name: "Draft", color: "#94A3B8", icon: CircleDot },
  ];

  // PR Labels
  const labels = [
    {
      id: "ready",
      name: "Ready to Merge",
      icon: CheckCircle2,
      color: "#34D399",
    },
    {
      id: "needs-review",
      name: "Needs Review",
      icon: AlertCircle,
      color: "#F59E0B",
    },
    { id: "ci-failed", name: "CI Failed", icon: X, color: "#EF4444" },
  ];

  // Sort Options
  const sortOptions = [
    { id: "newest", name: "Newest" },
    { id: "oldest", name: "Oldest" },
    { id: "updated", name: "Recently Updated" },
  ];

  // Pull Requests Data
  const pullRequests = [
    {
      id: 1,
      number: 234,
      title: "Add new storage engine with improved concurrency support",
      author: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/32/32",
        reputation: 3420,
      },
      status: "open",
      labels: ["needs-review"],
      body: "This PR introduces a new storage engine implementation with better concurrency handling and improved write performance...",
      votes: 12,
      comments: 8,
      commits: 15,
      changedFiles: 23,
      additions: 1243,
      deletions: 345,
      sourceBranch: "feature/storage-engine",
      targetBranch: "main",
      createdAt: "2023-10-01T14:22:11Z",
      lastActivity: "2023-10-02T09:15:00Z",
      ciStatus: "success",
      reviewStatus: "changes_requested",
      participants: [
        { name: "Bob Smith", avatar: "/api/placeholder/32/32" },
        { name: "Carol White", avatar: "/api/placeholder/32/32" },
      ],
    },
    {
      id: 2,
      number: 235,
      title: "Refactor authentication module for better plugin support",
      author: {
        name: "Michael Brown",
        avatar: "/api/placeholder/32/32",
        reputation: 2150,
      },
      status: "merged",
      labels: ["ready"],
      body: "This refactoring makes the authentication module more modular and adds support for custom authentication providers...",
      votes: 8,
      comments: 5,
      commits: 7,
      changedFiles: 12,
      additions: 456,
      deletions: 234,
      sourceBranch: "refactor/auth-module",
      targetBranch: "main",
      createdAt: "2023-10-03T09:15:44Z",
      lastActivity: "2023-10-03T16:30:00Z",
      ciStatus: "success",
      reviewStatus: "approved",
      participants: [
        { name: "David Lee", avatar: "/api/placeholder/32/32" },
        { name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
        { name: "Frank Miller", avatar: "/api/placeholder/32/32" },
      ],
    },
  ];

  // Active filters
  let selectedStatus = $state("all");
  let selectedSort = $state("newest");
  let searchQuery = $state("");

  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    if (diff < 1000 * 60) return "just now";
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}m ago`;
    if (diff < 1000 * 60 * 60 * 24)
      return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
    if (diff < 1000 * 60 * 60 * 24 * 7)
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;

    return date.toLocaleDateString();
  }

  // Format numbers helper
  function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  }

  // Get CI status icon and color
  function getCIStatus(status) {
    const statusMap = {
      success: { icon: Check, color: "#34D399" },
      failure: { icon: X, color: "#EF4444" },
      pending: { icon: Clock, color: "#F59E0B" },
    };
    return statusMap[status] || statusMap.pending;
  }
</script>

<div class="max-w-7xl mx-auto px-4">
  <!-- Header with Search and Filters -->
  <div
    class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6"
  >
    <div class="flex-1 w-full">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search pull requests..."
          class="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          bind:value={searchQuery}
        />
        <Search class="absolute left-3 top-2.5 text-zinc-400" size={18} />
      </div>
    </div>

    <div class="flex gap-3 w-full sm:w-auto">
      <Button class="flex-1 sm:flex-none">
        <Filter size={18} class="mr-2" />
        Filter
      </Button>
      <Button class="flex-1 sm:flex-none" color="green">
        <Plus size={18} class="mr-2" />
        New Pull Request
      </Button>
    </div>
  </div>

  <!-- Status Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button
      class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors
             {selectedStatus === 'all'
        ? 'bg-zinc-700 text-white'
        : 'bg-zinc-800/50 text-zinc-400 hover:text-white'}"
      onclick={() => (selectedStatus = "all")}
    >
      All
    </button>
    {#each statusTypes as status}
      <button
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        style="background-color: {selectedStatus === status.id
          ? status.color + '40'
          : 'rgba(39, 39, 42, 0.5)'};
               color: {selectedStatus === status.id ? status.color : '#a1a1aa'};
               border: 1px solid {selectedStatus === status.id
          ? status.color + '80'
          : 'transparent'}"
        onclick={() => (selectedStatus = status.id)}
      >
        <status.icon size={14} />
        {status.name}
      </button>
    {/each}
  </div>

  <!-- Sort Options -->
  <div class="flex items-center gap-4 mb-6 text-sm text-zinc-400">
    <span>Sort by:</span>
    {#each sortOptions as option}
      <button
        class="transition-colors hover:text-white {selectedSort === option.id
          ? 'text-white font-medium'
          : ''}"
        onclick={() => (selectedSort = option.id)}
      >
        {option.name}
      </button>
    {/each}
  </div>

  <!-- Pull Requests List -->
  <div class="space-y-4">
    {#each pullRequests as pr}
      <div
        class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
      >
        <div class="p-6">
          <!-- PR Header -->
          <div class="flex items-start gap-4">
            <!-- Status Icon -->
            {#if pr.status}
              {@const status = statusTypes.find((s) => s.id === pr.status)}
              <div class="pt-1">
                <status.icon
                  size={20}
                  style="color: {status.color}"
                />
              </div>
            {/if}

            <div class="flex-1 min-w-0">
              <!-- Title and Number -->
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-medium truncate">
                  {pr.title}
                </h3>
                <span class="text-sm text-zinc-400">#{pr.number}</span>
              </div>

              <!-- Labels -->
              {#if pr.labels?.length}
                <div class="flex gap-2 mb-3">
                  {#each pr.labels as labelId}
                    {@const label = labels.find((l) => l.id === labelId)}
                    {#if label}
                      <div
                        class="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                        style="background-color: {label.color}20; color: {label.color}"
                      >
                        <label.icon size={12} />
                        {label.name}
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}

              <!-- Metadata Row -->
              <div class="flex items-center gap-4 text-sm text-zinc-400">
                <div class="flex items-center gap-2">
                  <img
                    src={pr.author.avatar}
                    alt={pr.author.name}
                    class="w-5 h-5 rounded-full"
                  />
                  <span>{pr.author.name}</span>
                  <span class="text-emerald-500">• {pr.author.reputation}</span>
                </div>
                <div class="flex items-center gap-2">
                  <GitBranch size={14} />
                  <span>{pr.sourceBranch} → {pr.targetBranch}</span>
                </div>
                <span>opened {formatDate(pr.createdAt)}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-4 text-sm text-zinc-400">
              {#if pr.ciStatus}
                {@const ciStatus = getCIStatus(pr.ciStatus)}
                <div
                  class="flex items-center gap-1.5"
                  style="color: {ciStatus.color}"
                >
                  <ciStatus.icon size={16} />
                </div>
              {/if}

              <div class="flex items-center gap-1.5">
                <MessageCircle size={16} />
                <span>{pr.comments}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <GitCommit size={16} />
                <span>{pr.commits}</span>
              </div>
            </div>
          </div>

          <!-- Preview Text -->
          <p class="mt-4 text-zinc-300 line-clamp-2">{pr.body}</p>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between">
            <!-- Participants -->
            <div class="flex items-center -space-x-2">
              {#each pr.participants as participant}
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  class="w-6 h-6 rounded-full ring-2 ring-zinc-900"
                  title={participant.name}
                />
              {/each}
              {#if pr.participants.length > 0}
                <span class="ml-4 text-sm text-zinc-400">
                  {pr.participants.length} participant{pr.participants
                    .length !== 1
                    ? "s"
                    : ""}
                </span>
              {/if}
            </div>

            <!-- Changes Summary -->
            <div class="text-sm text-zinc-400">
              <span class="text-emerald-500">+{formatNumber(pr.additions)}</span
              >
              <span class="text-red-500">-{formatNumber(pr.deletions)}</span>
              <span class="ml-2">{formatNumber(pr.changedFiles)} files</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Load More -->
  <div class="mt-6 text-center">
    <Button color="dark" class="w-full sm:w-auto">
      Load More Pull Requests
    </Button>
  </div>
</div>
