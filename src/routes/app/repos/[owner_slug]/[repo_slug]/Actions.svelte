<script>
  import { 
    Search, 
    Filter,
    Play,
    Clock,
    Check,
    X,
    RotateCcw,
    Pause,
    Calendar,
    GitBranch,
    GitCommit,
    Box,
    Plus
  } from 'lucide-svelte';
  import { Button } from 'flowbite-svelte';

  // Action Status Types
  const statusTypes = [
    { id: 'success', name: 'Successful', color: '#34D399', icon: Check },
    { id: 'failure', name: 'Failed', color: '#F87171', icon: X },
    { id: 'running', name: 'In Progress', color: '#60A5FA', icon: Play },
    { id: 'cancelled', name: 'Cancelled', color: '#94A3B8', icon: X },
    { id: 'pending', name: 'Pending', color: '#F59E0B', icon: Clock }
  ];

  // Sort Options
  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'oldest', name: 'Oldest' },
    { id: 'duration', name: 'Duration' }
  ];

  // Actions Data
  const actions = [
    {
      id: 1,
      name: 'Build and Test',
      workflow: 'CI Pipeline',
      status: 'success',
      duration: '5m 32s',
      trigger: 'push',
      branch: 'main',
      commit: '3a1b2c4',
      commitMessage: 'Update storage engine implementation',
      actor: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/32/32'
      },
      steps: [
        { name: 'Setup Environment', status: 'success', duration: '45s' },
        { name: 'Install Dependencies', status: 'success', duration: '2m 12s' },
        { name: 'Run Tests', status: 'success', duration: '2m 35s' }
      ],
      artifacts: 2,
      createdAt: '2023-10-04T07:30:00Z'
    },
    {
      id: 2,
      name: 'Deploy to Production',
      workflow: 'CD Pipeline',
      status: 'failure',
      duration: '3m 45s',
      trigger: 'manual',
      branch: 'main',
      commit: '8d4e5f6',
      commitMessage: 'Implement new authentication system',
      actor: {
        name: 'Michael Brown',
        avatar: '/api/placeholder/32/32'
      },
      steps: [
        { name: 'Build Docker Image', status: 'success', duration: '2m 15s' },
        { name: 'Push to Registry', status: 'success', duration: '1m 00s' },
        { name: 'Deploy to K8s', status: 'failure', duration: '30s' }
      ],
      artifacts: 1,
      createdAt: '2023-10-04T08:00:00Z'
    }
  ];

  // Active filters
  let selectedStatus = 'all';
  let selectedSort = 'newest';
  let searchQuery = '';

  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 1000 * 60) return 'just now';
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))}m ago`;
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
    if (diff < 1000 * 60 * 60 * 24 * 7) return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;
    
    return date.toLocaleDateString();
  }

  // Get action status details
  function getActionStatus(status) {
    return statusTypes.find(s => s.id === status) || statusTypes[0];
  }
</script>

<div class="max-w-7xl mx-auto px-4">
  <!-- Header with Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
    <div class="flex-1 w-full">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search workflows..."
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
        <Play size={18} class="mr-2" />
        Run Workflow
      </Button>
    </div>
  </div>

  <!-- Status Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button
      class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors
             {selectedStatus === 'all' ? 'bg-zinc-700 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:text-white'}"
      on:click={() => selectedStatus = 'all'}
    >
      All
    </button>
    {#each statusTypes as status}
      <button
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        style="background-color: {selectedStatus === status.id ? status.color + '40' : 'rgba(39, 39, 42, 0.5)'};
               color: {selectedStatus === status.id ? status.color : '#a1a1aa'};
               border: 1px solid {selectedStatus === status.id ? status.color + '80' : 'transparent'}"
        on:click={() => selectedStatus = status.id}
      >
        <svelte:component this={status.icon} size={14} />
        {status.name}
      </button>
    {/each}
  </div>

  <!-- Sort Options -->
  <div class="flex items-center gap-4 mb-6 text-sm text-zinc-400">
    <span>Sort by:</span>
    {#each sortOptions as option}
      <button
        class="transition-colors hover:text-white {selectedSort === option.id ? 'text-white font-medium' : ''}"
        on:click={() => selectedSort = option.id}
      >
        {option.name}
      </button>
    {/each}
  </div>

  <!-- Actions List -->
  <div class="space-y-4">
    {#each actions as action}
      {@const status = getActionStatus(action.status)}
      <div class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
        <div class="p-6">
          <!-- Action Header -->
          <div class="flex items-start gap-4">
            <!-- Status Icon -->
            <div class="pt-1">
              <svelte:component 
                this={status.icon} 
                size={20} 
                style="color: {status.color}"
              />
            </div>

            <div class="flex-1 min-w-0">
              <!-- Title and Metadata -->
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-medium truncate">
                  {action.name}
                </h3>
                <span class="text-sm text-zinc-400">#{action.id}</span>
              </div>

              <!-- Workflow Badge -->
              <div class="flex gap-2 mb-3">
                <span
                  class="px-2 py-0.5 text-xs rounded-full bg-zinc-700/50 text-zinc-300 flex items-center gap-1"
                >
                  <Box size={12} />
                  {action.workflow}
                </span>
              </div>

              <!-- Metadata Row -->
              <div class="flex items-center gap-4 text-sm text-zinc-400">
                <div class="flex items-center gap-2">
                  <img
                    src={action.actor.avatar}
                    alt={action.actor.name}
                    class="w-5 h-5 rounded-full"
                  />
                  <span>{action.actor.name}</span>
                </div>
                <div class="flex items-center gap-2">
                  <GitBranch size={14} />
                  <span>{action.branch}</span>
                </div>
                <div class="flex items-center gap-2">
                  <GitCommit size={14} />
                  <span>{action.commit.slice(0, 7)}</span>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-4 text-sm text-zinc-400">
              <div class="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{action.duration}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Box size={16} />
                <span>{action.artifacts} artifacts</span>
              </div>
            </div>
          </div>

          <!-- Steps -->
          <div class="mt-4 space-y-2">
            {#each action.steps as step}
              {@const stepStatus = getActionStatus(step.status)}
              <div class="flex items-center justify-between py-2 px-3 rounded bg-zinc-800/50">
                <div class="flex items-center gap-3">
                  <svelte:component 
                    this={stepStatus.icon} 
                    size={16} 
                    style="color: {stepStatus.color}"
                  />
                  <span class="text-sm">{step.name}</span>
                </div>
                <span class="text-sm text-zinc-400">{step.duration}</span>
              </div>
            {/each}
          </div>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between text-sm text-zinc-400">
            <div class="flex items-center gap-2">
              <Calendar size={16} />
              <span>Started {formatDate(action.createdAt)}</span>
            </div>
            <div>
              <Button size="xs" color="dark">
                <RotateCcw size={14} class="mr-2" />
                Re-run
              </Button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Load More -->
  <div class="mt-6 text-center">
    <Button color="dark" class="w-full sm:w-auto">
      Load More Actions
    </Button>
  </div>
</div>