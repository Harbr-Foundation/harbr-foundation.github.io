<script>
  // Discussions Data
  const discussions = [
    {
      id: 1,
      title: 'How to optimize Rust code for performance?',
      author: 'Alice Johnson',
      comments: 10,
      createdAt: '2023-09-30T10:00:00Z'
    },
    {
      id: 2,
      title: 'Best practices for API design',
      author: 'Bob Lee',
      comments: 7,
      createdAt: '2023-10-01T11:45:22Z'
    }
  ];
</script>


<!-- Discussions Tab Content -->
<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6 space-y-4">
  {#each discussions as discussion}
    <div class="p-4 bg-zinc-800 rounded-lg">
      <h3 class="text-lg font-medium">{discussion.title}</h3>
      <p class="text-sm text-zinc-400">Started by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}</p>
      <p class="text-sm text-zinc-400 mt-2">{discussion.comments} comments</p>
    </div>
  {/each}
</div>