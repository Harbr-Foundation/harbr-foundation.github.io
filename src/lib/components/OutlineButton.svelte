<script>
    export let href;
</script>
  
<a
  {href}
  class="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-emerald-500 text-emerald-400 font-semibold hover:bg-emerald-500/10 transform hover:-translate-y-0.5 transition-all"
>
  <slot />
</a>