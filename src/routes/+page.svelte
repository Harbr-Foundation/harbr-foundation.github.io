<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import FeatureCard from '../lib/components/FeatureCard.svelte';
    import GradientButton from '../lib/components/PrimaryButton.svelte';
    import OutlineButton from '../lib/components/OutlineButton.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

    let mounted = false;
  
    const features = [
      {
        icon: '⚡',
        title: 'Community-Driven',
        description: 'Built by developers, for developers. Join our thriving open-source community and help shape the future of code collaboration.'
      },
      {
        icon: '🛡️',
        title: 'Privacy-First',
        description: 'Your code stays yours. Self-host your own instance or use our infrastructure, with full data control and transparency.'
      },
      {
        icon: '🤝',
        title: 'Open Source',
        description: 'MIT licensed, fully transparent codebase. Contribute, customize, and extend functionality to match your workflow.'
      }
    ];

    
    // New sections data
    const integrations = [
      { name: 'VS Code', icon: '📝', users: '27' },
      { name: 'GitHub', icon: '🐙', users: '26' },
      { name: 'GitLab', icon: '🦊', users: '0' },
      { name: 'Jira', icon: '📊', users: '0' },
      { name: 'Slack', icon: '💬', users: '0' },
      { name: 'Discord', icon: '🎮', users: '3' }
    ];
  
    onMount(() => {
      mounted = true;
    });
</script>

<svelte:head>
    <title>Harbr - Open Source Code Collaboration</title>
    <meta name="description" content="A community-driven, open source platform for modern code collaboration. Built by developers, for developers." />
</svelte:head>

<Navbar></Navbar>

<div class="relative">
    <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-transparent opacity-30" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {#if mounted}
            <div in:fade={{ duration: 1000 }}>
                <h1 
                    class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                    in:fly={{ y: 20, duration: 1000, delay: 200 }}
                >
                    Code Collaboration for Everyone
                </h1>
                <p 
                    class="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
                    in:fly={{ y: 20, duration: 1000, delay: 400 }}
                >
                    An truly open source revision control platform built on transparency, community, and innovation. No vendor lock-in, no closed source magic.
                </p>
                <div 
                    class="flex flex-col sm:flex-row gap-4 justify-center"
                    in:fly={{ y: 20, duration: 1000, delay: 600 }}
                >
                    <GradientButton href="https://github.com/harbr">Star on GitHub</GradientButton>
                    <OutlineButton href="#docs">Read the Docs</OutlineButton>
                </div>
            </div>
        {/if}
    </div>
</div>

<!-- Features section -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as feature, i}
            <div in:fly={{ y: 20, duration: 1000, delay: 800 + (i * 200) }}>
                <FeatureCard {...feature} />
            </div>
        {/each}
    </div>
</div>

<!-- Stats Section -->
<div class="bg-zinc-900/50 py-24 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {#each [
                { value: '0', label: 'GitHub Stars' },
                { value: '2', label: 'Contributors' },
                { value: '0', label: 'Forks' },
                { value: '7', label: 'Languages' }
            ] as stat}
                <div class="p-6">
                    <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                    </div>
                    <div class="text-zinc-400">{stat.label}</div>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- Code Preview Section -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Community-Driven Development
            </h2>
            <p class="text-zinc-400 text-lg">
                Join a community of passionate developers building the future of code collaboration. Every feature is open source and community reviewed.
            </p>
            <div class="space-y-4">
                {#each [
                    { title: 'MIT Licensed', description: 'Free to use, modify, and distribute. Forever.' },
                    { title: 'Self-Hostable', description: 'Run your own instance with full control over your data.' },
                    { title: 'Extensible', description: 'Build plugins and extend functionality to match your needs.' }
                ] as item}
                    <div class="flex items-start gap-4">
                        <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white">{item.title}</h3>
                            <p class="text-zinc-400">{item.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg filter blur-3xl"></div>
            <div class="relative bg-zinc-900/90 p-6 rounded-lg border border-zinc-800">
                <!-- macOS-style buttons -->
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre class="text-sm text-zinc-300 overflow-x-auto font-mono">
<code>$ git clone https://github.com/harbr/core
⚡ Cloning repository...
✓ Clone completed

$ cd harbr && yarn install
📦 Installing dependencies...
✓ Setup complete

$ yarn dev
🚀 Starting development server...
✨ Ready at http://localhost:3000</code>
                </pre>
            </div>
        </div>
    </div>
</div>

<!-- Contribution Section -->
<div class="bg-zinc-900/50 py-24 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                Built by the Community
            </h2>
            <p class="text-zinc-400 text-lg">
                Every feature is shaped by real developers solving real problems. Join us in building the future.
            </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            {#each [
                {
                    icon: '🔧',
                    title: 'Contribute Code',
                    description: 'Submit pull requests, fix bugs, and help improve the codebase.'
                },
                {
                    icon: '📝',
                    title: 'Documentation',
                    description: 'Help make our docs better and more accessible for everyone.'
                },
                {
                    icon: '💡',
                    title: 'Share Ideas',
                    description: 'Propose new features and help shape the roadmap.'
                }
            ] as item}
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-emerald-500/50 transition-colors">
                        <div class="text-4xl mb-4">{item.icon}</div>
                        <h3 class="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p class="text-zinc-400">{item.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- NEW: Integrations Section -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Seamless Integrations
        </h2>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
            Connect with your favorite tools and services without leaving your workflow.
        </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {#each integrations as integration}
            <div class="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 text-center hover:border-emerald-500/50 transition-all">
                <div class="text-4xl mb-2">{integration.icon}</div>
                <div class="font-semibold text-white mb-1">{integration.name}</div>
                <div class="text-sm text-emerald-400">{integration.users} users</div>
            </div>
        {/each}
    </div>
</div>


<!-- NEW: Developer Experience Section -->
<div class="bg-zinc-900/50 py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                Designed for Developers
            </h2>
            <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
                Experience lightning-fast workflows with tools that feel natural and powerful.
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            {#each [
                { icon: '⚡', title: 'Quick Setup', description: 'Get started in minutes with our CLI tool and comprehensive documentation.' },
                { icon: '🔌', title: 'Plugin System', description: 'Extend functionality with a powerful plugin system built on web standards.' },
                { icon: '🔍', title: 'Smart Search', description: 'Find code instantly with our advanced semantic search engine.' },
                { icon: '🔄', title: 'Auto Sync', description: 'Keep your repositories in sync with automated mirroring and backup.' },
                { icon: '🔑', title: 'SSH Keys', description: 'Manage access securely with SSH key authentication and role-based permissions.' },
                { icon: '📊', title: 'Analytics', description: 'Get insights into your codebase with detailed analytics and reporting.' }
            ] as item}
                <div class="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-emerald-500/50 transition-all">
                    <div class="text-4xl mb-4">{item.icon}</div>
                    <h3 class="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p class="text-zinc-400">{item.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- Community Spotlight -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Community Spotlight
        </h2>
        <p class="text-zinc-400 text-lg">
            Meet some of our amazing contributors and their impact on the project.
        </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each [
            {
                quote: "Contributing to Harbr has been an amazing learning experience. The community is so welcoming and supportive.",
                author: "Alex Chen",
                contribution: "Core Contributor - 156 PRs"
            },
            {
                quote: "Love how the project embraces open source values. Everyone can contribute and make a difference.",
                author: "Maria Garcia",
                contribution: "Documentation Lead - 89 PRs"
            },
            {
                quote: "The plugin system is incredibly well designed. Building extensions is a joy.",
                author: "James Wilson",
                contribution: "Plugin Maintainer - 124 PRs"
            }
        ] as testimonial}
            <div class="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <p class="text-zinc-300 mb-4">{testimonial.quote}</p>
                <div>
                    <div class="font-semibold text-white">{testimonial.author}</div>
                    <div class="text-sm text-emerald-400">{testimonial.contribution}</div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Performance Metrics -->
<div class="bg-zinc-900/50 py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                Built for Performance
            </h2>
            <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
                Lightning-fast speeds and efficient resource usage. Because every millisecond counts.
            </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each [
                {
                    metric: '50ms',
                    label: 'Average Response Time',
                    description: 'Quick responses for smooth workflows'
                },
                {
                    metric: '99.99%',
                    label: 'Uptime Guarantee',
                    description: 'Enterprise-grade reliability'
                },
                {
                    metric: '5x',
                    label: 'Faster Than Traditional VCS',
                    description: 'Optimized for modern development'
                },
                {
                    metric: '80%',
                    label: 'Less Resource Usage',
                    description: 'Efficient and sustainable'
                }
            ] as stat}
                <div class="p-6 bg-zinc-900/90 rounded-lg border border-zinc-800">
                    <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        {stat.metric}
                    </div>
                    <div class="font-semibold text-white mb-2">{stat.label}</div>
                    <div class="text-sm text-zinc-400">{stat.description}</div>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- Learning Resources -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Learn & Grow
        </h2>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
            Comprehensive resources to help you master Harbr and level up your development skills.
        </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each [
            {
                icon: '📚',
                title: 'Documentation',
                items: ['Getting Started Guide', 'API Reference', 'Best Practices', 'Use Cases']
            },
            {
                icon: '🎓',
                title: 'Tutorials',
                items: ['Video Courses', 'Interactive Labs', 'Code Examples', 'Workshop Materials']
            },
            {
                icon: '👥',
                title: 'Community',
                items: ['Discord Server', 'Office Hours', 'Mentorship', 'Events']
            }
        ] as resource}
            <div class="bg-zinc-900/90 p-6 rounded-lg border border-zinc-800 hover:border-emerald-500/50 transition-all">
                <div class="text-4xl mb-4">{resource.icon}</div>
                <h3 class="text-xl font-semibold text-white mb-4">{resource.title}</h3>
                <ul class="space-y-2">
                    {#each resource.items as item}
                        <li class="text-zinc-400 flex items-center gap-2">
                            <div class="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            {item}
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</div>

<!-- CTA Section -->
<div class="relative">
    <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-30"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Join Our Open Source Community
        </h2>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Build with us, learn with us, grow with us. Harbr is more than code—it's a community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton href="https://github.com/harbr">View on GitHub</GradientButton>
            <OutlineButton href="#contribute">Start Contributing</OutlineButton>
        </div>
    </div>
</div>
<Footer></Footer>