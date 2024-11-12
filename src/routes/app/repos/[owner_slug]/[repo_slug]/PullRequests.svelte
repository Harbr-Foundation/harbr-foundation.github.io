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

</script>

<!-- Pull Requests Tab Content -->
 <div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
      {#each pullRequests as pr}
        <div class="p-4 bg-zinc-800 rounded-lg">
          <h3 class="text-lg font-medium">{pr.title}</h3>
          <p class="text-sm text-zinc-400">Opened by {pr.author} on {new Date(pr.createdAt).toLocaleDateString()}</p>
          <p class="text-sm text-zinc-400 mt-2">{pr.comments} comments</p>
          <p class="text-sm text-zinc-400 mt-2">Status: {pr.status}</p>
    </div>
   {/each}
</div>