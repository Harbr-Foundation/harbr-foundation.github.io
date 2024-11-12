<script>
  // Issues Data
  const issues = [
    {
      id: 1,
      title: 'Bug: Fix memory leak in storage engine',
      author: 'John Doe',
      labels: ['bug', 'high priority'],
      comments: 5,
      createdAt: '2023-10-01T12:34:56Z'
    },
    {
      id: 2,
      title: 'Feature: Add support for new authentication method',
      author: 'Jane Smith',
      labels: ['enhancement'],
      comments: 2,
      createdAt: '2023-10-02T08:22:33Z'
    }
  ];
</script>

<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
  {#each issues as issue}
    <div class="p-4 bg-zinc-800 rounded-lg">
      <h3 class="text-lg font-medium">{issue.title}</h3>
      <p class="text-sm text-zinc-400">Opened by {issue.author} on {new Date(issue.createdAt).toLocaleDateString()}</p>
      <div class="flex gap-2 mt-2">
        {#each issue.labels as label}
          <span class="px-2 py-1 text-xs bg-zinc-700 rounded-full">{label}</span>
        {/each}
      </div>
      <p class="text-sm text-zinc-400 mt-2">{issue.comments} comments</p>
    </div>
  {/each}
</div>