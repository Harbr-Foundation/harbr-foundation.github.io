<script lang="ts">
  import { page } from '$app/stores';
  import { 
    ChevronRight,
    Search,
    Menu,
    X,
    ChevronDown
  } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  
  import Navbar from '$lib/components/Navbar.svelte';

  let { data, children } = $props();
  
  let searchQuery = '';
  let isMenuOpen = false;
  let openCategories: string[] = [];
  
  let filteredDocs = $derived(data.docs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ));
  
  function toggleCategory(category: string) {
    if (openCategories.includes(category)) {
      openCategories = openCategories.filter(c => c !== category);
    } else {
      openCategories = [...openCategories, category];
    }
  }
  
  // Group docs by category
  let docsByCategory = $derived(data.docs.reduce((acc, doc) => {
    const category = doc.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} as Record<string, typeof data.docs>));

  const children_render = $derived(children);
</script>

<div class="min-h-screen bg-black">

  <Navbar></Navbar>

  <div class="max-w-8xl mx-auto flex">

    <!-- Main content -->
    <main class="flex-1 min-w-0 py-6 lg:px-8 xl:px-12">
      <div class="px-4 sm:px-6 lg:px-0">
        {@render children_render?.()}
      </div>
    </main>
  </div>
</div>