<!-- src/routes/(auth)/auth/+page.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import { 
      Github,
      LogIn, 
      UserPlus, 
      Mail, 
      Lock, 
      Eye, 
      EyeOff 
    } from 'lucide-svelte';
    import type { ActionData } from './$types';
    import Typewriter from '$lib/components/Typewriter.svelte';
    import { fly, fade } from 'svelte/transition';
    
  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();
    
    let isLogin = $state(true);
    let showPassword = $state(false);
    let isSubmitting = $state(false);
    
    // Form validation states
    let errors = $state({
      username: '',
      email: '',
      password: ''
    });
    
    function validateForm(formData: FormData): boolean {
      let isValid = true;
      errors = {
        username: '',
        email: '',
        password: ''
      };
  
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
      
      if (!isLogin) {
        const username = formData.get('username') as string;
        if (username.length < 3) {
          errors.username = 'Username must be at least 3 characters';
          isValid = false;
        }
      }
      
      return isValid;
    }
  </script>
  
  <div class="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Base dark overlay -->
      <div class="absolute inset-0 bg-black/40"></div>
      
      <!-- Animated floating orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl animate-float-1"></div>
      <div class="absolute top-3/4 left-2/3 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl animate-float-2"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-700/20 blur-3xl animate-float-3"></div>
      <div class="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-emerald-600/20 blur-3xl animate-float-4"></div>
      <div class="absolute top-2/3 right-1/3 w-88 h-88 rounded-full bg-emerald-500/20 blur-3xl animate-float-5"></div>
    </div>
  
    <!-- Auth container -->
    <div class="w-full max-w-md relative">
      <!-- Logo and title -->
      <div class="text-center mb-8">
        <div class="inline-block p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" class="text-emerald-500">
            <rect width="40" height="40" rx="8" fill="currentColor" fill-opacity="0.2" />
            <path d="M20 12L28 24H12L20 12Z" fill="currentColor" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold tracking-tight"
        in:fly={{ y: 10, duration: 500, delay: 200, opacity: 0 }}>
          Welcome to Harbr
        </h1>
        <Typewriter text="Your modern version control platform" />
      </div>
  
      <!-- Auth form -->
      <div class="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6">
        <!-- Tab switcher -->
        <div class="flex gap-1 mb-6">
          <button 
            onclick={() => isLogin = true}
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
              {isLogin ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            Sign In
          </button>
          <button 
            onclick={() => isLogin = false}
            class="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
              {!isLogin ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
          >
            Sign Up
          </button>
        </div>
  
        <!-- Form -->
        <form
          method="POST"
          action="?/{isLogin ? 'login' : 'register'}"
          use:enhance={() => {
            isSubmitting = true;
            return async ({ result, update }) => {
              isSubmitting = false;
              await update();
            };
          }}
          class="space-y-4"
        >
          {#if form?.error}
            <div class="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              An error occurred. Please try again later.
            </div>
          {/if}
  
          {#if form?.credentials}
            <div class="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              Invalid email or password.
            </div>
          {/if}
  
          {#if !isLogin}
            <div>
              <label class="block text-sm font-medium text-zinc-300 mb-1.5">Username</label>
              <div class="relative">
                <input
                  name="username"
                  type="text"
                  required
                  class="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2.5 pl-10
                        text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500
                        transition-colors {errors.username ? 'border-red-500' : ''}"
                  placeholder="Choose a username"
                />
                <UserPlus size={18} class="absolute left-3 top-3 text-zinc-500" />
              </div>
              {#if errors.username}
                <p class="mt-1 text-sm text-red-500">{errors.username}</p>
              {/if}
            </div>
          {/if}
  
          <div>
            <label class="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
            <div class="relative">
              <input
                name="email"
                type="email"
                required
                class="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2.5 pl-10
                      text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500
                      transition-colors {errors.email ? 'border-red-500' : ''}"
                placeholder="Enter your email"
              />
              <Mail size={18} class="absolute left-3 top-3 text-zinc-500" />
            </div>
            {#if errors.email}
              <p class="mt-1 text-sm text-red-500">{errors.email}</p>
            {/if}
          </div>
  
          <div>
            <label class="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
            <div class="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                class="w-full bg-black/20 border border-zinc-800 rounded-lg px-4 py-2.5 pl-10
                      text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500
                      transition-colors {errors.password ? 'border-red-500' : ''}"
                placeholder={isLogin ? "Enter your password" : "Choose a password"}
              />
              <Lock size={18} class="absolute left-3 top-3 text-zinc-500" />
              <button
                type="button"
                onclick={() => showPassword = !showPassword}
                class="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
              >
                {#if showPassword}
                  <EyeOff size={18} />
                {:else}
                  <Eye size={18} />
                {/if}
              </button>
            </div>
            {#if errors.password}
              <p class="mt-1 text-sm text-red-500">{errors.password}</p>
            {/if}
          </div>
  
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2.5
                  font-medium flex items-center justify-center gap-2 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <span class="animate-spin">⟳</span>
            {:else if isLogin}
              <LogIn size={18} />
              Sign In
            {:else}
              <UserPlus size={18} />
              Create Account
            {/if}
          </button>
  
          <!-- OAuth divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-zinc-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-zinc-900/50 text-zinc-500">Or continue with</span>
            </div>
          </div>
  
          <!-- OAuth button -->
          <button
            type="button"
            class="w-full bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5
                  font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Github size={18} />
            GitHub
          </button>
  
          <!-- Auth switch prompt -->
          <p class="text-sm text-center text-zinc-500 mt-6">
            {#if isLogin}
              Don't have an account?
              <button 
                type="button"
                onclick={() => isLogin = false}
                class="text-emerald-500 hover:text-emerald-400 font-medium ml-1"
              >
                Sign up
              </button>
            {:else}
              Already have an account?
              <button 
                type="button"
                onclick={() => isLogin = true}
                class="text-emerald-500 hover:text-emerald-400 font-medium ml-1"
              >
                Sign in
              </button>
            {/if}
          </p>
        </form>
      </div>
    </div>
  </div>
  
  <style lang="postcss">
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
      animation: float-1 20s ease-in-out infinite;
    }
    
    :global(.animate-float-2) {
      animation: float-2 25s ease-in-out infinite;
    }
    
    :global(.animate-float-3) {
      animation: float-3 22s ease-in-out infinite;
    }
    
    :global(.animate-float-4) {
      animation: float-4 28s ease-in-out infinite;
    }
    
    :global(.animate-float-5) {
      animation: float-5 24s ease-in-out infinite;
    }
  
    /* Add smooth transition for color changes */
    :global(.bg-emerald-500\/20),
    :global(.bg-emerald-600\/20),
    :global(.bg-emerald-700\/20) {
      transition: background-color 3s ease-in-out;
    }
  </style>