<!-- src/lib/components/Typewriter.svelte -->
<script lang="ts">
   interface Props {
      text: string;
      typingSpeed?: number;
      startDelay?: number;
   }

   let { text, typingSpeed = 50, startDelay = 500 }: Props = $props();
   
    let displayText = $state('');
    let isTyping = $state(false);
   
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
        <span class="inline-block w-0.5 h-[1.25em] bg-emerald-500 ml-1 animate-pulse"></span>
      {/if}
    </h1>
</div>