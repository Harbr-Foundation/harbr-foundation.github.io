<script>
	import '../app.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();


	const children_render = $derived(children);
</script>
  
<div class="min-h-screen bg-black text-white flex flex-col">
	<main class="flex-grow">
	  {@render children_render?.()}
	</main>
</div>