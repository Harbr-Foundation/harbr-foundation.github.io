<!-- FeatureCard.svelte -->
<script>
  export let icon = null;
  export let title = '';
  export let description = '';
</script>

<div class="group p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/50 transform hover:-translate-y-1 transition-all">
  {#if icon}
    <div class="text-4xl mb-4 text-zinc-400 group-hover:text-emerald-400 transition-colors">
      <svelte:component this={icon} size={32} />
    </div>
  {/if}
  <h3 class="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
    {title}
  </h3>
  <p class="text-zinc-400 mb-4">
    {description}
  </p>
  <div class="space-y-4">
    <slot />
  </div>
</div>