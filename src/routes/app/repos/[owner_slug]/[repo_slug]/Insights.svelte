<script>
  // Insights Data
  const insights = {
    commits: 1432,
    contributors: 25,
    issuesClosed: 200,
    pullRequestsMerged: 150
  };
</script>

<div class="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-6">
  <h3 class="text-lg font-medium">Repository Insights</h3>
  <p class="text-sm text-zinc-400 mt-2">Commits: {insights.commits}</p>
  <p class="text-sm text-zinc-400 mt-2">Contributors: {insights.contributors}</p>
  <p class="text-sm text-zinc-400 mt-2">Issues Closed: {insights.issuesClosed}</p>
  <p class="text-sm text-zinc-400 mt-2">Pull Requests Merged: {insights.pullRequestsMerged}</p>
</div>