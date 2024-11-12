<script>
    import { Spinner } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let messages = [
        "Baking cookies... 🍪",
        "Creating new repository... 🛠️",
        "Configuring settings... ⚙️",
        "Taking over the world... 🌍",
        "Initializing repository... 🚀",
        "Recruiting minions... 🧑‍🤝‍🧑",
        "Setting up branches... 🌳",
        "Configuring remote... 📡",
        "Be patient, there will be cake at the conclusion...",
        "Finalizing setup... 🎉",
        "Taking you to our leader... 👽",
        "Done, here is your cake! 🎂"
    ];
    let currentMessageIndex = 0;
    let showForm = true;
    let showLoading = false;
    let repoName = '';
    let description = '';
    let displayedMessages = [];

    function typewriterEffect(text, speed = 50) {
        return new Promise(resolve => {
            let index = 0;
            let currentMessage = '';
            
            function type() {
                if (index < text.length) {
                    currentMessage += text.charAt(index);
                    // Update the last message in the array
                    displayedMessages[displayedMessages.length - 1] = currentMessage;
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            
            // Add a new empty message to the array
            displayedMessages = [...displayedMessages, ''];
            type();
        });
    }

    async function displayNextMessage() {
        while (currentMessageIndex < messages.length && showLoading) {
            await typewriterEffect(messages[currentMessageIndex]);
            currentMessageIndex++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    async function handleSubmit() {
        if (repoName.trim() === '') {
            alert('Repository name is required.');
            return;
        }

        showForm = false;
        showLoading = true;
        displayedMessages = []; // Reset messages when starting new submission
        
        // Start the message animation
        displayNextMessage();

        // Simulate repository creation (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 100000));
        
        // After creation is complete
        showLoading = false;
        showForm = true; // Or redirect to the new repository
    }

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
        text-align: center;
    }

    .message {
        margin-top: 20px;
        font-size: 1.5em;
        color: #fff;
    }

    .terminal {
        margin-top: 20px;
        width: 700px;
        height: 450px;
        background: linear-gradient(135deg, rgba(30,30,30,0.8), rgba(37, 37, 37, 0.8));
        color: #00ff00;
        font-family: monospace;
        overflow-y: auto;
        border: 1px solid #333;
        text-align: left;
        border-radius: 10px;
        position: relative;
    }

    .terminal-header {
        display: flex;
        align-items: center;
        padding: 5px;
        background-color: #333;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 2px solid #0f0f0f;
    }

    .terminal-content {
        padding: 10px;
        height: calc(100% - 30px);
        overflow-y: auto;
    }

    .macos-buttons {
        display: flex;
        gap: 5px;
        padding-left: 8px;
    }

    .macos-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .macos-button.close { background-color: #ff5f56; }
    .macos-button.minimize { background-color: #ffbd2e; }
    .macos-button.fullscreen { background-color: #27c93f; }

    .repo-form {
        max-width: 500px;
        margin: 0 auto;
        padding: 2rem;
        background: rgba(30, 30, 30, 0.8);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        color: #fff;
        font-size: 0.9rem;
    }

    .form-input {
        width: 100%;
        padding: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        color: #fff;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    .form-input:focus {
        outline: none;
        border-color: #34d399;
    }

    .form-button {
        width: 100%;
        padding: 0.75rem;
        background: #34d399;
        color: #000;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .form-button:hover {
        background: #2bbf89;
    }

    .message-line {
        margin: 8px 0;
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

        /* Random floating animations for each orb */
        @keyframes float-1 {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes float-2 {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-40px, 30px) scale(1.2); }
        66% { transform: translate(25px, -25px) scale(0.95); }
        100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes float-3 {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(35px, 35px) scale(0.9); }
        66% { transform: translate(-30px, -40px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes float-4 {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-25px, -35px) scale(1.1); }
        66% { transform: translate(40px, 25px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }

    @keyframes float-5 {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(45px, -30px) scale(0.95); }
        66% { transform: translate(-35px, 35px) scale(1.05); }
        100% { transform: translate(0, 0) scale(1); }
    }

    /* Apply animations globally */
    :global(.animate-float-1) {
        animation: float-1 10s ease-in-out infinite;
    }
    
    :global(.animate-float-2) {
        animation: float-2 12.5s ease-in-out infinite;
    }
    
    :global(.animate-float-3) {
        animation: float-3 11s ease-in-out infinite;
    }
    
    :global(.animate-float-4) {
        animation: float-4 14s ease-in-out infinite;
    }
    
    :global(.animate-float-5) {
        animation: float-5 12s ease-in-out infinite;
    }

    /* Add smooth transition for color changes */
    :global(.bg-emerald-500\/20),
    :global(.bg-emerald-600\/20),
    :global(.bg-emerald-700\/20) {
        transition: background-color 3s ease-in-out;
    }
</style>

<div class="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-black/40" />
        
        <!-- Animated floating orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl animate-float-1" />
        <div class="absolute top-3/4 left-2/3 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl animate-float-2" />
        <div class="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-700/20 blur-3xl animate-float-3" />
        <div class="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-emerald-600/20 blur-3xl animate-float-4" />
        <div class="absolute top-2/3 right-1/3 w-88 h-88 rounded-full bg-emerald-500/20 blur-3xl animate-float-5" />
    </div>

    {#if showForm}
        <form 
            class="repo-form"
            on:submit|preventDefault={handleSubmit}
            transition:fade
        >
            <div class="form-group">
                <label class="form-label">
                    Repository Name
                    <input
                        type="text"
                        bind:value={repoName}
                        class="form-input"
                        placeholder="my-awesome-project"
                        required
                    />
                </label>
            </div>
            
            <div class="form-group">
                <label class="form-label">
                    Description
                    <textarea
                        bind:value={description}
                        class="form-input"
                        rows="4"
                        placeholder="Describe your project..."
                    ></textarea>
                </label>
            </div>
            
            <button type="submit" class="form-button">
                Create Repository
            </button>
        </form>
    {/if}

    {#if showLoading}
        <div class="loading-container" transition:fade>
            <Spinner size="10" color="#34d399"/>
            <div class="message">Creating new repository...</div>
            <div class="terminal">
                <div class="terminal-header">
                    <div class="macos-buttons">
                        <div class="macos-button close"></div>
                        <div class="macos-button minimize"></div>
                        <div class="macos-button fullscreen"></div>
                    </div>
                </div>
                <div class="terminal-content">
                    {#each displayedMessages as message}
                        <div class="message-line">
                            {message}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>