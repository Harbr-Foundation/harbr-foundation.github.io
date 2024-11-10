<!-- src/lib/components/Typewriter.svelte -->
<script lang="ts">
    export let text: string;
    export let typingSpeed = 50;
    export let startDelay = 500;
   
    let displayText = '';
    let isTyping = false;
   
    async function typeText() {
      isTyping = true;
      await new Promise(resolve => setTimeout(resolve, startDelay));
     
      for (let i = 0; i <= text.length; i++) {
        displayText = text.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }
     
      isTyping = false;
    }
   
    // Start typing when component mounts
    typeText();
</script>

<div class="relative">
    <h1 class="flex items-center pl-24">
      <span>{displayText}</span>
      {#if isTyping}
        <span class="inline-block w-0.5 h-[1.25em] bg-emerald-500 ml-1 animate-pulse" />
      {/if}
    </h1>
</div>