<script lang="ts">
  import { 
    Star,
    GitFork,
    Globe2,
    Lock,
    FileCode,
    GitBranch,
    Eye,
    MessageCircle,
    AlertCircle,
    PackageOpen,
    Settings,
    Infinity,
    ChevronRight,
    Activity
  } from 'lucide-svelte';
  import { writable } from 'svelte/store';
  import { selectedTab } from '$lib/stores/tabStore';

  // Repo tab components
  import SettingsPage from '$lib/components/Settings.svelte';
  import Security from './Security.svelte';
  import Insights from './Insights.svelte';
  import Actions from './Actions.svelte';
  import Packages from './Packages.svelte';
  import Discussions from './Discussions.svelte';
  import Code from './Code.svelte';
  import PullRequests from './PullRequests.svelte';
  import Issues from './Issues.svelte';
  import RepoHeading from './RepoHeading.svelte';

</script>

<RepoHeading/>

<div class="px-10 max-w-7xl mx-auto ">
  {#if $selectedTab === 'code'}
    <Code></Code>
  {:else if $selectedTab === 'issues'}
    <Issues></Issues>
  {:else if $selectedTab === 'prs'}
    <PullRequests></PullRequests>
  {:else if $selectedTab === 'discussions'}
    <Discussions></Discussions>
  {:else if $selectedTab === 'actions'}
    <Actions></Actions>
  {:else if $selectedTab === 'packages'}
    <Packages></Packages>
  {:else if $selectedTab === 'security'}
    <Security></Security>
  {:else if $selectedTab === 'insights'}
    <Insights></Insights>
  {:else if $selectedTab === 'settings'}
    <SettingsPage></SettingsPage>
  {/if}
</div>