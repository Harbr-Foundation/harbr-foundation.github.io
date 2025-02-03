<script>
  import { 
    MessageSquare, 
    Search, 
    Filter,
    ThumbsUp,
    MessageCircle,
    Clock,
    Tag,
    CheckCircle2,
    AlertCircle,
    Flame,
    ArrowUp,
    Plus
  } from 'lucide-svelte';
  import { Button } from 'flowbite-svelte';

  // Discussion Categories
  const categories = [
    { id: 'general', name: 'General', color: '#60A5FA' },
    { id: 'help', name: 'Help Wanted', color: '#34D399' },
    { id: 'bugs', name: 'Bug Reports', color: '#F87171' },
    { id: 'feature', name: 'Feature Requests', color: '#818CF8' },
    { id: 'announce', name: 'Announcements', color: '#FBBF24' }
  ];

  // Discussion Labels
  const labels = [
    { id: 'solved', name: 'Solved', icon: CheckCircle2, color: '#34D399' },
    { id: 'urgent', name: 'Urgent', icon: AlertCircle, color: '#EF4444' },
    { id: 'hot', name: 'Hot', icon: Flame, color: '#F59E0B' }
  ];

  // Sort Options
  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'active', name: 'Most Active' },
    { id: 'votes', name: 'Most Voted' }
  ];

  // Discussions Data with more details
  const discussions = [
    {
      id: 1,
      title: 'How to optimize Rust code for performance?',
      author: {
        name: 'Alice Johnson',
        avatar: '/api/placeholder/32/32',
        reputation: 1250
      },
      category: 'help',
      labels: ['hot'],
      body: 'I\'m working on optimizing our storage engine and looking for best practices...',
      votes: 45,
      comments: 12,
      views: 238,
      solved: true,
      createdAt: '2023-09-30T10:00:00Z',
      lastActivity: '2023-10-02T15:30:00Z',
      participants: [
        { name: 'Bob Smith', avatar: '/api/placeholder/32/32' },
        { name: 'Carol White', avatar: '/api/placeholder/32/32' }
      ]
    },
    {
      id: 2,
      title: 'Announcing new storage engine implementation',
      author: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/32/32',
        reputation: 3420
      },
      category: 'announce',
      labels: ['hot', 'urgent'],
      body: 'We\'re excited to announce the release of our new storage engine...',
      votes: 89,
      comments: 34,
      views: 562,
      solved: false,
      createdAt: '2023-10-01T11:45:22Z',
      lastActivity: '2023-10-02T09:15:00Z',
      participants: [
        { name: 'David Lee', avatar: '/api/placeholder/32/32' },
        { name: 'Emma Wilson', avatar: '/api/placeholder/32/32' },
        { name: 'Frank Miller', avatar: '/api/placeholder/32/32' }
      ]
    }
  ];

  // Active filters
  let selectedCategory = $state('all');
  let selectedSort = $state('newest');
  let searchQuery = $state('');

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
</script>

<div class="max-w-7xl mx-auto px-4">
  <!-- Header with Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
    <div class="flex-1 w-full">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search discussions..."
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
        New Discussion
      </Button>
    </div>
  </div>

  <!-- Category Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button
      class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors
             {selectedCategory === 'all' ? 'bg-zinc-700 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:text-white'}"
      onclick={() => selectedCategory = 'all'}
    >
      All
    </button>
    {#each categories as category}
      <button
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        style="background-color: {selectedCategory === category.id ? category.color + '40' : 'rgba(39, 39, 42, 0.5)'};
               color: {selectedCategory === category.id ? category.color : '#a1a1aa'};
               border: 1px solid {selectedCategory === category.id ? category.color + '80' : 'transparent'}"
        onclick={() => selectedCategory = category.id}
      >
        <span class="w-2 h-2 rounded-full" style="background-color: {category.color}"></span>
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Sort Options -->
  <div class="flex items-center gap-4 mb-6 text-sm text-zinc-400">
    <span>Sort by:</span>
    {#each sortOptions as option}
      <button
        class="transition-colors hover:text-white {selectedSort === option.id ? 'text-white font-medium' : ''}"
        onclick={() => selectedSort = option.id}
      >
        {option.name}
      </button>
    {/each}
  </div>

  <!-- Discussions List -->
  <div class="space-y-4">
    {#each discussions as discussion}
      <div class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
        <div class="p-6">
          <!-- Discussion Header -->
          <div class="flex items-start gap-4">
            <!-- Votes -->
            <div class="flex flex-col items-center gap-1 pt-1">
              <button class="text-zinc-400 hover:text-emerald-500 transition-colors">
                <ArrowUp size={20} />
              </button>
              <span class="font-medium">{discussion.votes}</span>
            </div>

            <div class="flex-1 min-w-0">
              <!-- Title and Category -->
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-medium truncate">
                  {discussion.title}
                </h3>
                <span
                  class="px-2 py-0.5 text-xs rounded-full"
                  style="background-color: {categories.find(c => c.id === discussion.category)?.color}40;
                         color: {categories.find(c => c.id === discussion.category)?.color}"
                >
                  {categories.find(c => c.id === discussion.category)?.name}
                </span>
              </div>

              <!-- Labels -->
              {#if discussion.labels?.length}
                <div class="flex gap-2 mb-3">
                  {#each discussion.labels as labelId}
                    {@const label = labels.find(l => l.id === labelId)}
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

              <!-- Author and Metadata -->
              <div class="flex items-center gap-4 text-sm text-zinc-400">
                <div class="flex items-center gap-2">
                  <img
                    src={discussion.author.avatar}
                    alt={discussion.author.name}
                    class="w-5 h-5 rounded-full"
                  />
                  <span>{discussion.author.name}</span>
                  <span class="text-emerald-500">• {discussion.author.reputation}</span>
                </div>
                <span>started {formatDate(discussion.createdAt)}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-4 text-sm text-zinc-400">
              <div class="flex items-center gap-1.5">
                <MessageCircle size={16} />
                <span>{discussion.comments}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{formatDate(discussion.lastActivity)}</span>
              </div>
            </div>
          </div>

          <!-- Preview Text -->
          <p class="mt-4 text-zinc-300 line-clamp-2">{discussion.body}</p>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between">
            <!-- Participants -->
            <div class="flex items-center -space-x-2">
              {#each discussion.participants as participant}
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  class="w-6 h-6 rounded-full ring-2 ring-zinc-900"
                  title={participant.name}
                />
              {/each}
              {#if discussion.participants.length > 0}
                <span class="ml-4 text-sm text-zinc-400">
                  {discussion.participants.length} participant{discussion.participants.length !== 1 ? 's' : ''}
                </span>
              {/if}
            </div>

            <!-- Views -->
            <div class="text-sm text-zinc-400">
              {discussion.views} views
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Load More -->
  <div class="mt-6 text-center">
    <Button color="dark" class="w-full sm:w-auto">
      Load More Discussions
    </Button>
  </div>
</div>