<script>
  import { 
    Search, 
    Filter,
    Package,
    Download,
    Clock,
    Tag,
    Calendar,
    FileText,
    ArrowUpRight,
    Plus,
    History,
    Star,
    Box,
    Bookmark
  } from 'lucide-svelte';
  import { Button } from 'flowbite-svelte';

  // Package Types
  const packageTypes = [
    { id: 'app', name: 'Applications', color: '#60A5FA', icon: Box },
    { id: 'lib', name: 'Libraries', color: '#34D399', icon: Package },
    { id: 'cli', name: 'CLI Tools', color: '#F59E0B', icon: FileText }
  ];

  // Sort Options
  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'downloads', name: 'Most Downloaded' },
    { id: 'updated', name: 'Recently Updated' }
  ];

  // Packages Data
  const packages = [
    {
      id: 1,
      name: 'harbr-core',
      type: 'lib',
      description: 'Core library for Harbr framework providing essential functionality and utilities',
      version: '1.0.0',
      versions: ['1.0.0', '0.9.0', '0.8.0'],
      downloads: 1200,
      weeklyDownloads: 280,
      monthlyDownloads: 1200,
      license: 'MIT',
      dependencies: 5,
      stars: 45,
      size: '2.4 MB',
      tags: ['core', 'framework', 'utilities'],
      maintainers: [
        { name: 'Sarah Chen', avatar: '/api/placeholder/32/32' },
        { name: 'Michael Brown', avatar: '/api/placeholder/32/32' }
      ],
      lastUpdate: '2023-10-01T10:00:00Z',
      createdAt: '2023-09-25T12:00:00Z'
    },
    {
      id: 2,
      name: 'harbr-api',
      type: 'lib',
      description: 'API client library for interacting with Harbr services and endpoints',
      version: '0.9.1',
      versions: ['0.9.1', '0.9.0', '0.8.5'],
      downloads: 800,
      weeklyDownloads: 180,
      monthlyDownloads: 800,
      license: 'MIT',
      dependencies: 3,
      stars: 32,
      size: '1.8 MB',
      tags: ['api', 'client', 'http'],
      maintainers: [
        { name: 'David Lee', avatar: '/api/placeholder/32/32' },
        { name: 'Emma Wilson', avatar: '/api/placeholder/32/32' }
      ],
      lastUpdate: '2023-09-30T15:30:00Z',
      createdAt: '2023-09-28T15:30:00Z'
    }
  ];

  // Active filters
  let selectedType = $state('all');
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

  // Format number helper
  function formatNumber(num) {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  }
</script>

<div class="max-w-7xl mx-auto px-4">
  <!-- Header with Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
    <div class="flex-1 w-full">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search packages..."
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
        Publish Package
      </Button>
    </div>
  </div>

  <!-- Type Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button
      class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors
             {selectedType === 'all' ? 'bg-zinc-700 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:text-white'}"
      onclick={() => selectedType = 'all'}
    >
      All
    </button>
    {#each packageTypes as type}
      <button
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        style="background-color: {selectedType === type.id ? type.color + '40' : 'rgba(39, 39, 42, 0.5)'};
               color: {selectedType === type.id ? type.color : '#a1a1aa'};
               border: 1px solid {selectedType === type.id ? type.color + '80' : 'transparent'}"
        onclick={() => selectedType = type.id}
      >
        <type.icon size={14} />
        {type.name}
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

  <!-- Packages List -->
  <div class="space-y-4">
    {#each packages as pkg}
      {@const type = packageTypes.find(t => t.id === pkg.type)}
      <div class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
        <div class="p-6">
          <!-- Package Header -->
          <div class="flex items-start gap-4">
            <!-- Type Icon -->
            <div class="pt-1">
              <type.icon 
                size={20} 
                style="color: {type.color}"
              />
            </div>

            <div class="flex-1 min-w-0">
              <!-- Title and Version -->
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-medium truncate hover:text-blue-400 cursor-pointer">
                  {pkg.name}
                </h3>
                <span 
                  class="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1"
                >
                  <Tag size={12} />
                  v{pkg.version}
                </span>
              </div>

              <!-- Description -->
              <p class="text-zinc-300 mb-3 line-clamp-2">{pkg.description}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-3">
                {#each pkg.tags as tag}
                  <span class="px-2 py-0.5 text-xs rounded-full bg-zinc-700/50 text-zinc-300">
                    {tag}
                  </span>
                {/each}
              </div>

              <!-- Metadata Row -->
              <div class="flex items-center gap-4 text-sm text-zinc-400">
                <div class="flex items-center -space-x-2">
                  {#each pkg.maintainers as maintainer}
                    <img
                      src={maintainer.avatar}
                      alt={maintainer.name}
                      class="w-5 h-5 rounded-full ring-2 ring-zinc-900"
                      title={maintainer.name}
                    />
                  {/each}
                </div>
                <span class="flex items-center gap-1">
                  <Star size={14} />
                  {pkg.stars}
                </span>
                <span>{pkg.license}</span>
                <span>{pkg.size}</span>
                <span class="flex items-center gap-1">
                  <Box size={14} />
                  {pkg.dependencies} dependencies
                </span>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-6 text-sm text-zinc-400">
              <!-- Download Stats -->
              <div class="flex flex-col items-end">
                <div class="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Download size={16} />
                  <span>{formatNumber(pkg.downloads)} total</span>
                </div>
                <div class="text-xs">
                  {formatNumber(pkg.weeklyDownloads)} weekly
                </div>
              </div>

              <!-- Last Update -->
              <div class="flex items-center gap-1.5">
                <Clock size={16} />
                <span>Updated {formatDate(pkg.lastUpdate)}</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between">
            <!-- Version History -->
            <div class="flex items-center gap-2 text-sm text-zinc-400">
              <History size={16} />
              <span>Previous versions:</span>
              {#each pkg.versions.slice(1) as version}
                <span class="px-1.5 py-0.5 rounded bg-zinc-700/50">{version}</span>
              {/each}
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <Button size="xs" color="dark">
                <Download size={14} class="mr-2" />
                Download
              </Button>
              <Button size="xs" color="dark">
                <FileText size={14} class="mr-2" />
                Documentation
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
      Load More Packages
    </Button>
  </div>
</div>