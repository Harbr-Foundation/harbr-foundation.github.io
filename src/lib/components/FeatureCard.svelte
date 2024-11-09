<script>
    export let icon
    export let title
    export let description
</script>
  
  <div class="group p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/50 transform hover:-translate-y-1 transition-all">
    <div class="text-4xl mb-4">{icon}</div>
    <h3 class="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
      {title}
    </h3>
    <p class="text-zinc-400">
      {description}
    </p>
  </div>