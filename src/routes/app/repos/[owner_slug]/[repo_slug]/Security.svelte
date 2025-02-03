<script>
  import { 
    Search, 
    Filter,
    Shield,
    AlertTriangle,
    AlertOctagon,
    AlertCircle,
    CheckCircle2,
    Clock,
    Eye,
    EyeOff,
    Lock,
    FileText,
    Plus,
    PackageOpen,
    GitPullRequest,
    Activity
  } from 'lucide-svelte';
  import { Button } from 'flowbite-svelte';

  // Severity Levels
  const severityLevels = [
    { id: 'critical', name: 'Critical', color: '#EF4444', icon: AlertOctagon },
    { id: 'high', name: 'High', color: '#F97316', icon: AlertTriangle },
    { id: 'medium', name: 'Medium', color: '#F59E0B', icon: AlertCircle },
    { id: 'low', name: 'Low', color: '#10B981', icon: CheckCircle2 }
  ];

  // Sort Options
  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'severity', name: 'Severity' },
    { id: 'affected', name: 'Most Affected' }
  ];

  // Security Advisories
  const advisories = [
    {
      id: 1,
      title: 'Remote Code Execution in Package Parser',
      severity: 'critical',
      cvss: 9.8,
      cve: 'CVE-2023-12345',
      status: 'open',
      affectedPackages: [
        { name: 'harbr-core', versions: ['<1.0.2'] },
        { name: 'harbr-api', versions: ['<0.9.3'] }
      ],
      discoveredBy: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/32/32'
      },
      description: 'A vulnerability in the package parser component allows remote attackers to execute arbitrary code via malformed package metadata.',
      patches: [
        { version: '1.0.2', pullRequest: 234 },
        { version: '0.9.3', pullRequest: 235 }
      ],
      createdAt: '2023-10-01T10:00:00Z',
      updatedAt: '2023-10-02T15:30:00Z',
      references: [
        { type: 'Fix PR', url: '#234' },
        { type: 'Advisory', url: '#CVE-2023-12345' }
      ],
      timeline: [
        { event: 'Reported', date: '2023-10-01T10:00:00Z' },
        { event: 'Confirmed', date: '2023-10-01T14:00:00Z' },
        { event: 'Fix Developed', date: '2023-10-02T09:00:00Z' },
        { event: 'Patch Released', date: '2023-10-02T15:30:00Z' }
      ]
    },
    {
      id: 2,
      title: 'Authentication Bypass in Token Validation',
      severity: 'high',
      cvss: 8.4,
      cve: 'CVE-2023-12346',
      status: 'fixed',
      affectedPackages: [
        { name: 'harbr-api', versions: ['<0.9.2'] }
      ],
      discoveredBy: {
        name: 'Michael Brown',
        avatar: '/api/placeholder/32/32'
      },
      description: 'Improper validation of authentication tokens could allow unauthorized access to protected resources.',
      patches: [
        { version: '0.9.2', pullRequest: 230 }
      ],
      createdAt: '2023-09-28T08:00:00Z',
      updatedAt: '2023-09-29T16:45:00Z',
      references: [
        { type: 'Fix PR', url: '#230' },
        { type: 'Advisory', url: '#CVE-2023-12346' }
      ],
      timeline: [
        { event: 'Reported', date: '2023-09-28T08:00:00Z' },
        { event: 'Confirmed', date: '2023-09-28T11:30:00Z' },
        { event: 'Fix Developed', date: '2023-09-29T14:00:00Z' },
        { event: 'Patch Released', date: '2023-09-29T16:45:00Z' }
      ]
    }
  ];

  // Active filters
  let selectedSeverity = $state('all');
  let selectedSort = $state('newest');
  let searchQuery = $state('');
  let showFixedVulnerabilities = $state(true);

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

  function getSeverityLevel(severity) {
    return severityLevels.find(s => s.id === severity) || severityLevels[0];
  }

  const SvelteComponent = $derived(showFixedVulnerabilities ? Eye : EyeOff);
</script>

<div class="max-w-7xl mx-auto px-4">
  <!-- Security Overview -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {#each severityLevels as level}
      <div class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <level.icon 
              size={20} 
              style="color: {level.color}"
            />
            <span class="font-medium">{level.name}</span>
          </div>
          <span class="text-2xl font-semibold" style="color: {level.color}">
            {advisories.filter(a => a.severity === level.id).length}
          </span>
        </div>
      </div>
    {/each}
  </div>

  <!-- Header with Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
    <div class="flex-1 w-full">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search security advisories..."
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
        <Shield size={18} class="mr-2" />
        Report Vulnerability
      </Button>
    </div>
  </div>

  <!-- Severity Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button
      class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors
             {selectedSeverity === 'all' ? 'bg-zinc-700 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:text-white'}"
      onclick={() => selectedSeverity = 'all'}
    >
      All
    </button>
    {#each severityLevels as level}
      <button
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
        style="background-color: {selectedSeverity === level.id ? level.color + '40' : 'rgba(39, 39, 42, 0.5)'};
               color: {selectedSeverity === level.id ? level.color : '#a1a1aa'};
               border: 1px solid {selectedSeverity === level.id ? level.color + '80' : 'transparent'}"
        onclick={() => selectedSeverity = level.id}
      >
        <level.icon size={14} />
        {level.name}
      </button>
    {/each}
  </div>

  <!-- Sort and View Options -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-4 text-sm text-zinc-400">
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
    
    <button
      class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      onclick={() => showFixedVulnerabilities = !showFixedVulnerabilities}
    >
      <SvelteComponent size={16} />
      {showFixedVulnerabilities ? 'Hide' : 'Show'} Fixed Vulnerabilities
    </button>
  </div>

  <!-- Advisories List -->
  <div class="space-y-4">
    {#each advisories as advisory}
      {@const severity = getSeverityLevel(advisory.severity)}
      <div class="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors">
        <div class="p-6">
          <!-- Advisory Header -->
          <div class="flex items-start gap-4">
            <!-- Severity Icon -->
            <div class="pt-1">
              <severity.icon 
                size={20} 
                style="color: {severity.color}"
              />
            </div>

            <div class="flex-1 min-w-0">
              <!-- Title and Metadata -->
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-medium truncate">
                  {advisory.title}
                </h3>
                <span
                  class="px-2 py-0.5 text-xs rounded-full bg-zinc-700 text-zinc-300"
                >
                  {advisory.cve}
                </span>
              </div>

              <!-- CVSS Score -->
              <div class="flex gap-2 mb-3">
                <div
                  class="px-2 py-0.5 text-xs rounded-md font-medium flex items-center gap-1"
                  style="background-color: {severity.color}20; color: {severity.color}"
                >
                  <Activity size={12} />
                  CVSS {advisory.cvss}
                </div>
              </div>

              <!-- Description -->
              <p class="text-zinc-300 mb-3 line-clamp-2">
                {advisory.description}
              </p>

              <!-- Affected Packages -->
              <div class="flex flex-wrap gap-3 mb-3">
                {#each advisory.affectedPackages as pkg}
                  <div class="flex items-center gap-2 text-sm">
                    <PackageOpen size={14} class="text-zinc-400" />
                    <span class="font-medium">{pkg.name}</span>
                    <span class="text-zinc-400">{pkg.versions.join(', ')}</span>
                  </div>
                {/each}
              </div>

              <!-- Metadata Row -->
              <div class="flex items-center gap-4 text-sm text-zinc-400">
                <div class="flex items-center gap-2">
                  <img
                    src={advisory.discoveredBy.avatar}
                    alt={advisory.discoveredBy.name}
                    class="w-5 h-5 rounded-full"
                  />
                  <span>Reported by {advisory.discoveredBy.name}</span>
                </div>
                <span>Discovered {formatDate(advisory.createdAt)}</span>
              </div>
            </div>

            <!-- Status -->
            <div class="flex items-center gap-4">
              {#if advisory.status === 'fixed'}
                <div class="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  <span class="text-sm font-medium">Fixed</span>
                </div>
              {:else}
                <div class="text-orange-400 flex items-center gap-1.5">
                  <Clock size={16} />
                  <span class="text-sm font-medium">Open</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Timeline -->
          <div class="mt-4 border-t border-zinc-700/50 pt-4">
            <div class="flex items-center gap-6 text-sm">
              {#each advisory.timeline as event}
                <div class="flex items-center gap-2 text-zinc-400">
                  <span class="w-2 h-2 rounded-full bg-zinc-500"></span>
                  <span>{event.event}</span>
                  <span class="text-zinc-500">{formatDate(event.date)}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between">
            <!-- References -->
            <div class="flex items-center gap-4 text-sm">
              {#each advisory.patches as patch}
                <div class="flex items-center gap-2 text-zinc-400">
                  <GitPullRequest size={14} />
                  <span>PR #{patch.pullRequest}</span>
                  <span class="text-zinc-500">v{patch.version}</span>
                </div>
              {/each}
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <Button size="xs" color="dark">
                <FileText size={14} class="mr-2" />
                View Full Advisory
              </Button>
              {#if advisory.status !== 'fixed'}
                <Button size="xs" color="green">
                  <Lock size={14} class="mr-2" />
                  View Fix
                </Button>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Empty State -->
  {#if advisories.length === 0}
    <div class="text-center py-12 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
      <Shield size={48} class="mx-auto mb-4 text-zinc-400" />
      <h3 class="text-xl font-medium mb-2">No security advisories found</h3>
      <p class="text-zinc-400">No security vulnerabilities have been reported for this repository.</p>
    </div>
  {/if}

  <!-- Load More -->
  <div class="mt-6 text-center">
    <Button color="dark" class="w-full sm:w-auto">
      Load More Advisories
    </Button>
  </div>

  <!-- Security Policy -->
  <div class="mt-8 p-6 bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50">
    <div class="flex items-start gap-4">
      <Shield class="text-emerald-400" size={24} />
      <div>
        <h3 class="text-lg font-medium mb-2">Security Policy</h3>
        <p class="text-zinc-300 mb-4">
          Learn about our security practices and how to report vulnerabilities responsibly.
        </p>
        <Button size="sm" color="dark">
          View Security Policy
        </Button>
      </div>
    </div>
  </div>
</div>
