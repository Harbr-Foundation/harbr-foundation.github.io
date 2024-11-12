<script>
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
</script>

<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
  {#each actions as action}
    <div class="p-4 bg-zinc-800 rounded-lg">
      <h3 class="text-lg font-medium">{action.name}</h3>
      <p class="text-sm text-zinc-400">Status: {action.status}</p>
      <p class="text-sm text-zinc-400 mt-2">Duration: {action.duration}</p>
      <p class="text-sm text-zinc-400 mt-2">Run at: {new Date(action.createdAt).toLocaleDateString()}</p>
    </div>
  {/each}
</div>