<script>
  let { href, children } = $props();

  const children_render = $derived(children);
</script>
  
<a
  {href}
  class="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:from-cyan-400 hover:to-emerald-400 transform hover:-translate-y-0.5 transition-all"
>
  {@render children_render?.()}
</a>
  