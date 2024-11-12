<script>
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
</script>

<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
  {#each packages as pkg}
    <div class="p-4 bg-zinc-800 rounded-lg">
      <h3 class="text-lg font-medium">{pkg.name}</h3>
      <p class="text-sm text-zinc-400">Version: {pkg.version}</p>
      <p class="text-sm text-zinc-400 mt-2">Downloads: {pkg.downloads}</p>
      <p class="text-sm text-zinc-400 mt-2">Published on: {new Date(pkg.createdAt).toLocaleDateString()}</p>
    </div>
  {/each}
</div>