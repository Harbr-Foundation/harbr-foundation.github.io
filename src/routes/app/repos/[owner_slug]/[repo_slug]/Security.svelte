<script>
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
</script>


<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
  {#each securityAlerts as alert}
    <div class="p-4 bg-zinc-800 rounded-lg">
      <h3 class="text-lg font-medium">{alert.title}</h3>
      <p class="text-sm text-zinc-400">Severity: {alert.severity}</p>
      <p class="text-sm text-zinc-400 mt-2">Reported on: {new Date(alert.createdAt).toLocaleDateString()}</p>
    </div>
  {/each}
</div>