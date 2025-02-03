<!-- routes/app/settings/advanced/+page.svelte -->
<script>
    import { 
      Settings,
      Shield,
      Key,
      Bell,
      Terminal,
      Save,
      AlertTriangle,
      Database,
      RefreshCw,
      Trash2,
      Download
    } from 'lucide-svelte';
    
    import PrimaryButton from '$lib/components/PrimaryButton.svelte';
    import OutlineButton from '$lib/components/OutlineButton.svelte';
    import FeatureCard from '$lib/components/ContentCard.svelte';
  
    let activeTab = $state('general');
  
    const tabs = [
      { id: 'general', name: 'General', icon: Settings },
      { id: 'security', name: 'Security', icon: Shield },
      { id: 'tokens', name: 'Access Tokens', icon: Key },
      { id: 'notifications', name: 'Notifications', icon: Bell },
      { id: 'actions', name: 'Actions', icon: Terminal }
    ];
  
    // Example settings state
    let settings = $state({
      enableWebhooks: false,
      backupFrequency: 'daily',
      retentionDays: 30,
      enableAuditLog: true,
      notificationLevel: 'all'
    });
  </script>
  
  <div class="flex flex-col gap-6 m-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-white">Advanced Settings</h1>
      <PrimaryButton on:click={() => console.log('Save settings')}>
        <Save size={18} />
        <span>Save Changes</span>
      </PrimaryButton>
    </div>
  
    <!-- Tabs Navigation -->
    <div class="border-b border-zinc-800">
      <nav class="flex space-x-2" aria-label="Settings tabs">
        {#each tabs as tab}
          <button
            class="px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-t-lg transition-colors
                   {activeTab === tab.id 
                     ? 'text-emerald-400 border-b-2 border-emerald-500 bg-zinc-900/50' 
                     : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'}"
            onclick={() => activeTab = tab.id}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        {/each}
      </nav>
    </div>
  
    <!-- Tab Content -->
    <div class="grid gap-6">
      {#if activeTab === 'general'}
        <div class="space-y-6">
          <FeatureCard
              icon={Database}
              title="Backup Settings"
              description="Configure automatic backup frequency and retention policies"
            >
                <div class="mt-4 space-y-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-zinc-400">Backup Frequency</label>
                    <select
                      bind:value={settings.backupFrequency}
                      class="h-9 px-3 bg-black border border-zinc-800 rounded-md text-zinc-300"
                    >
                      <option value="hourly">Every hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
  
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium text-zinc-400">Retention Period (days)</label>
                    <input
                      type="number"
                      bind:value={settings.retentionDays}
                      class="h-9 px-3 bg-black border border-zinc-800 rounded-md text-zinc-300"
                    />
                  </div>
                </div>
              <Database size={24} class="text-zinc-500" />
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-white">Data Export</h3>
                <p class="mt-1 text-sm text-zinc-400">Export your repository data and settings</p>
                
                <div class="mt-4 flex gap-3">
                  <OutlineButton>
                    <Download size={18} />
                    <span>Export Data</span>
                  </OutlineButton>
                  <OutlineButton>
                    <RefreshCw size={18} />
                    <span>Sync Settings</span>
                  </OutlineButton>
                </div>
              </div>
            </div>
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-white flex items-center gap-2">
                  Danger Zone
                  <AlertTriangle size={18} class="text-amber-500" />
                </h3>
                <p class="mt-1 text-sm text-zinc-400">Destructive actions that cannot be undone</p>
                
                <div class="mt-4">
                  <button 
                    class="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Reset All Settings
                  </button>
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
  
      {:else if activeTab === 'security'}
        <div class="space-y-6">
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-white">Audit Log</h3>
                <p class="mt-1 text-sm text-zinc-400">Track all changes and access to your repositories</p>
                
                <div class="mt-4">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      bind:checked={settings.enableAuditLog}
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                after:bg-white after:border-zinc-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500">
                    </div>
                    <span class="ml-3 text-sm font-medium text-zinc-400">Enable Audit Logging</span>
                  </label>
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
  
      {:else if activeTab === 'tokens'}
        <div class="space-y-6">
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Personal Access Tokens</h3>
                <p class="mt-1 text-sm text-zinc-400">Manage your API access tokens</p>
                
                <div class="mt-4 space-y-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-medium text-white">Development Token</h4>
                      <p class="text-sm text-zinc-400">Last used: 2 hours ago</p>
                    </div>
                    <OutlineButton>
                      <RefreshCw size={16} />
                      Regenerate
                    </OutlineButton>
                  </div>
                  
                  <div class="flex gap-2">
                    <input 
                      type="text"
                      value="ghp_A7fk9J2bN4mX8pQ3..."
                      readonly
                      class="flex-1 h-9 px-3 bg-black border border-zinc-800 rounded-md text-zinc-300 font-mono text-sm"
                    />
                    <OutlineButton>Copy</OutlineButton>
                  </div>
  
                  <div class="pt-4 border-t border-zinc-800">
                    <PrimaryButton>
                      <Key size={16} />
                      Generate New Token
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Active Sessions</h3>
                <p class="mt-1 text-sm text-zinc-400">Manage your current login sessions</p>
                
                <div class="mt-4 space-y-4">
                  {#each [{device: 'MacBook Pro', location: 'San Francisco, US', time: 'Current session'},
                          {device: 'iPhone 13', location: 'San Francisco, US', time: '2 hours ago'},
                          {device: 'Windows PC', location: 'New York, US', time: '1 day ago'}] as session}
                    <div class="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
                      <div>
                        <h4 class="font-medium text-white">{session.device}</h4>
                        <p class="text-sm text-zinc-400">{session.location} • {session.time}</p>
                      </div>
                      {#if session.time !== 'Current session'}
                        <OutlineButton>Revoke</OutlineButton>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
  
      {:else if activeTab === 'notifications'}
        <div class="space-y-6">
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Notification Preferences</h3>
                <p class="mt-1 text-sm text-zinc-400">Configure how and when you receive notifications</p>
                
                <div class="mt-4 space-y-4">
                  {#each [
                    {title: 'Pull Requests', desc: 'When someone mentions you or requests your review'},
                    {title: 'Issues', desc: 'When youre assigned or mentioned'},
                    {title: 'Repository Updates', desc: 'New releases and major changes'},
                    {title: 'Security Alerts', desc: 'Critical security vulnerabilities'}
                  ] as setting}
                    <div class="flex items-start justify-between py-3 border-b border-zinc-800 last:border-0">
                      <div>
                        <h4 class="font-medium text-white">{setting.title}</h4>
                        <p class="text-sm text-zinc-400">{setting.desc}</p>
                      </div>
                      <select class="h-9 px-3 bg-black border border-zinc-800 rounded-md text-zinc-300">
                        <option value="all">All activity</option>
                        <option value="mentions">Only mentions</option>
                        <option value="none">Disabled</option>
                      </select>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Delivery Methods</h3>
                <p class="mt-1 text-sm text-zinc-400">Choose how you want to receive notifications</p>
                
                <div class="mt-4 space-y-4">
                  {#each [
                    {method: 'Email', address: 'user@example.com'},
                    {method: 'Desktop', status: 'Enabled'},
                    {method: 'Mobile Push', status: 'Not configured'}
                  ] as delivery}
                    <div class="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
                      <div>
                        <h4 class="font-medium text-white">{delivery.method}</h4>
                        <p class="text-sm text-zinc-400">{delivery.address || delivery.status}</p>
                      </div>
                      <OutlineButton>Configure</OutlineButton>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
  
      {:else if activeTab === 'actions'}
        <div class="space-y-6">
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Workflow Permissions</h3>
                <p class="mt-1 text-sm text-zinc-400">Configure default permissions for repository workflows</p>
                
                <div class="mt-4 space-y-4">
                  <div class="flex items-center justify-between py-3 border-b border-zinc-800">
                    <div>
                      <h4 class="font-medium text-white">Default Workflow Permissions</h4>
                      <p class="text-sm text-zinc-400">Choose the base permission level for workflows</p>
                    </div>
                    <select class="h-9 px-3 bg-black border border-zinc-800 rounded-md text-zinc-300">
                      <option value="read">Read repository contents</option>
                      <option value="write">Read and write permissions</option>
                      <option value="none">No permissions</option>
                    </select>
                  </div>
  
                  <div class="pt-4">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" class="sr-only peer">
                      <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer 
                                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:border-zinc-300 after:border after:rounded-full 
                                  after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500">
                      </div>
                      <span class="ml-3 text-sm font-medium text-zinc-400">
                        Allow workflows to create and approve pull requests
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Runner Groups</h3>
                <p class="mt-1 text-sm text-zinc-400">Manage self-hosted runner access and permissions</p>
                
                <div class="mt-4 space-y-4">
                  {#each [
                    {name: 'Production', runners: 4, status: 'Active'},
                    {name: 'Development', runners: 2, status: 'Active'},
                    {name: 'Testing', runners: 1, status: 'Offline'}
                  ] as group}
                    <div class="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
                      <div>
                        <h4 class="font-medium text-white">{group.name}</h4>
                        <p class="text-sm text-zinc-400">{group.runners} runners • {group.status}</p>
                      </div>
                      <div class="flex gap-2">
                        <OutlineButton>Edit</OutlineButton>
                        <OutlineButton>View Logs</OutlineButton>
                      </div>
                    </div>
                  {/each}
  
                  <div class="pt-4">
                    <PrimaryButton>
                      <Terminal size={16} />
                      Add Runner Group
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>
  
          <FeatureCard>
            <div class="flex items-start justify-between">
              <div class="w-full">
                <h3 class="text-lg font-medium text-white">Environment Secrets</h3>
                <p class="mt-1 text-sm text-zinc-400">Manage encrypted secrets for your workflows</p>
                
                <div class="mt-4 space-y-4">
                  {#each [
                    {name: 'AWS_ACCESS_KEY', updated: '2 days ago'},
                    {name: 'DOCKER_TOKEN', updated: '1 week ago'},
                    {name: 'API_KEY', updated: '1 month ago'}
                  ] as secret}
                    <div class="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
                      <div>
                        <h4 class="font-medium text-white">{secret.name}</h4>
                        <p class="text-sm text-zinc-400">Updated {secret.updated}</p>
                      </div>
                      <div class="flex gap-2">
                        <OutlineButton>Update</OutlineButton>
                        <button class="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  {/each}
  
                  <div class="pt-4">
                    <PrimaryButton>
                      <Key size={16} />
                      Add Secret
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
      {/if}
    </div>
  </div>