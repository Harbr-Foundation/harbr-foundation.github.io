<!-- lib/components/Markdown.svelte -->
<script>
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import {
      Copy,
      CheckCheck
    } from 'lucide-svelte';
  
    export let content = '';
    let copied = false;
  
    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true,
      langPrefix: 'language-'
    });
  
    // Custom renderer
    const renderer = new marked.Renderer();
  
    // Custom code block rendering
    renderer.code = (code, language) => {
      return `
        <div class="relative group">
          <div class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="copy-btn p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-zinc-400 hover:text-white transition-all"
                    data-code="${code.replace(/"/g, '&quot;')}">
              <svg class="copy-icon w-4 h-4">
                <use href="#copy-icon"></use>
              </svg>
              <svg class="check-icon hidden w-4 h-4">
                <use href="#check-icon"></use>
              </svg>
            </button>
          </div>
          <pre class="!mt-0"><code class="language-${language}">${code}</code></pre>
        </div>
      `;
    };
  
    // Custom link rendering
    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title || ''}" class="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                target="_blank" rel="noopener noreferrer">${text}</a>`;
    };
  
    // Custom heading rendering
    renderer.heading = (text, level) => {
      const sizes = {
        1: 'text-3xl',
        2: 'text-2xl',
        3: 'text-xl',
        4: 'text-lg',
        5: 'text-base',
        6: 'text-sm'
      };
      return `
        <h${level} class="font-semibold ${sizes[level]} text-white mb-4 mt-8 first:mt-0">
          ${text}
        </h${level}>
      `;
    };
  
    onMount(() => {
      // Initialize code copy functionality
      document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
          const code = button.dataset.code;
          navigator.clipboard.writeText(code);
          
          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');
          
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          
          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
          }, 2000);
        });
      });
    });
  </script>
  
  <!-- SVG Icons -->
  <svg class="hidden">
    <symbol id="copy-icon" viewBox="0 0 24 24">
      <Copy />
    </symbol>
    <symbol id="check-icon" viewBox="0 0 24 24">
      <CheckCheck />
    </symbol>
  </svg>
  
  <!-- Markdown Content -->
  <div class="markdown prose prose-invert max-w-none">
    {@html marked(content, { renderer })}
  </div>
  
  <style lang="postcss">
    :global(.markdown) {
      /* Headers */
      :global(h1, h2, h3, h4, h5, h6) {
        @apply font-semibold text-white border-b border-zinc-800 pb-3;
      }
  
      /* Paragraphs and spacing */
      :global(p) {
        @apply text-zinc-300 leading-relaxed mb-4;
      }
  
      /* Lists */
      :global(ul, ol) {
        @apply my-4 pl-6;
      }
  
      :global(li) {
        @apply text-zinc-300 mb-2;
      }
  
      :global(ul > li) {
        @apply list-disc;
      }
  
      :global(ol > li) {
        @apply list-decimal;
      }
  
      /* Code blocks */
      :global(pre) {
        @apply bg-zinc-900/70 border border-zinc-800 rounded-lg p-4 my-4 overflow-x-auto;
      }
  
      :global(code) {
        @apply font-mono text-sm;
      }
  
      :global(:not(pre) > code) {
        @apply bg-zinc-800/50 text-emerald-300 px-1.5 py-0.5 rounded text-sm;
      }
  
      /* Blockquotes */
      :global(blockquote) {
        @apply border-l-4 border-emerald-500/30 bg-zinc-900/30 pl-4 py-2 my-4 text-zinc-300 italic;
      }
  
      /* Tables */
      :global(table) {
        @apply w-full border-collapse my-4;
      }
  
      :global(th) {
        @apply bg-zinc-800/50 text-left p-2 text-zinc-300 font-medium border border-zinc-700;
      }
  
      :global(td) {
        @apply p-2 border border-zinc-800 text-zinc-300;
      }
  
      /* Horizontal rules */
      :global(hr) {
        @apply my-8 border-zinc-800;
      }
  
      /* Images */
      :global(img) {
        @apply max-w-full rounded-lg border border-zinc-800 my-4;
      }
  
      /* Task Lists */
      :global(.task-list-item) {
        @apply list-none;
      }
  
      :global(.task-list-item-checkbox) {
        @apply mr-2;
      }
    }
  </style>