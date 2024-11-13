<script>
    const currentYear = new Date().getFullYear();
    
    const footerSections = [
      {
        title: 'Product',
        links: [
          { href: '/features', label: 'Features' },
          { href: '/pricing', label: 'Pricing' },
          { href: '/enterprise', label: 'Enterprise' },
          { href: '/security', label: 'Security' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { href: '/docs', label: 'Documentation' },
          { href: '/api', label: 'API' },
          { href: '/blog', label: 'Blog' },
          { href: '/changelog', label: 'Changelog' }
        ]
      },
      {
        title: 'Company',
        links: [
          { href: '/about', label: 'About' },
          { href: '/careers', label: 'Careers' },
          { href: '/contact', label: 'Contact' },
          { href: '/legal', label: 'Legal' }
        ]
      }
    ];
  </script>
  
  <footer class="border-t border-zinc-800 py-12 mt-24">
    <h1 class="text-lg text-center pb-20 text-red-600">Footer links are a work in progress and may not yet all be functional</h1>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div class="col-span-2 md:col-span-1">
          <a href="/" class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Harbr
          </a>
          <p class="mt-4 text-sm text-zinc-400">
            The next evolution in code collaboration. Built for developers who demand both power and elegance.
          </p>
        </div>
  
        <!-- Footer Sections -->
        {#each footerSections as section}
          <div>
            <h3 class="font-semibold text-white mb-4">{section.title}</h3>
            <ul class="space-y-2">
              {#each section.links as { href, label }}
                <li>
                  <a {href} class="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                    {label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
  
      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-400">
        <p>© {currentYear} Harbr. All rights reserved.</p>
      </div>
    </div>
  </footer>