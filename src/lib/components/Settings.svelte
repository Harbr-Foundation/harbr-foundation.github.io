<!-- Settings.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    
    // Settings configuration object that can be used for API requests
    const settingsConfig = {
        general: {
            theme: {
                id: 'theme',
                label: 'Theme',
                type: 'select',
                options: ['light', 'dark', 'system'],
                value: 'system',
                description: 'Choose your preferred theme'
            },
            language: {
                id: 'language',
                label: 'Language',
                type: 'select',
                options: ['English', 'Spanish', 'French', 'German'],
                value: 'English',
                description: 'Select interface language'
            }
        },
        repository: {
            defaultBranch: {
                id: 'defaultBranch',
                label: 'Default Branch',
                type: 'text',
                value: 'main',
                description: 'Set your default branch name'
            },
            commitTemplate: {
                id: 'commitTemplate',
                label: 'Commit Template',
                type: 'textarea',
                value: '',
                description: 'Define a template for commit messages'
            }
        },
        security: {
            twoFactor: {
                id: 'twoFactor',
                label: 'Two-Factor Authentication',
                type: 'toggle',
                value: false,
                description: 'Enable two-factor authentication'
            },
            sessionTimeout: {
                id: 'sessionTimeout',
                label: 'Session Timeout',
                type: 'select',
                options: ['30 minutes', '1 hour', '2 hours', '4 hours'],
                value: '1 hour',
                description: 'Set session timeout duration'
            }
        },
        notifications: {
            emailNotifications: {
                id: 'emailNotifications',
                label: 'Email Notifications',
                type: 'toggle',
                value: true,
                description: 'Receive email notifications'
            },
            pushNotifications: {
                id: 'pushNotifications',
                label: 'Push Notifications',
                type: 'toggle',
                value: false,
                description: 'Receive push notifications'
            }
        },
        editor: {
            indentSize: {
                id: 'indentSize',
                label: 'Indent Size',
                type: 'select',
                options: ['2', '4', '8'],
                value: '2',
                description: 'Set indent size for code editor'
            },
            wordWrap: {
                id: 'wordWrap',
                label: 'Word Wrap',
                type: 'toggle',
                value: true,
                description: 'Enable word wrap in editor'
            }
        }
    };

    let activeTab = 'general';
    let settings = JSON.parse(JSON.stringify(settingsConfig)); // Deep copy for local state

    function handleSettingChange(category, settingId, value) {
        settings[category][settingId].value = value;
        saveSettings();
    }

    async function saveSettings() {
        try {
            const apiPayload = Object.entries(settings).reduce((acc, [category, categorySettings]) => {
                acc[category] = Object.entries(categorySettings).reduce((settingsAcc, [settingId, setting]) => {
                    settingsAcc[settingId] = setting.value;
                    return settingsAcc;
                }, {});
                return acc;
            }, {});

            console.log('Settings saved:', apiPayload);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    onMount(async () => {
        // Fetch initial settings here if needed
    });
</script>


<div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Tabs -->
    <nav class="flex space-x-2 border-b border-gray-200 mb-8">
        {#each Object.keys(settings) as tab}
            <button
                class="px-4 py-2 font-medium text-sm rounded-t-lg transition-colors duration-200 
                    {activeTab === tab ? 
                        'bg-neutral-900 text-emerald-900 border-b-2 border-emerald-900' : 
                        'text-gray-500 hover:text-gray-700'}" on:click={() => activeTab = tab}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
        {/each}
    </nav>

    <!-- Settings Content -->
    <div class="space-y-6">
        {#each Object.entries(settings[activeTab]) as [id, setting]}
            <div class="rounded-lg bg-neutral-900 p-6 shadow-sm">
                <div class="flex flex-col space-y-2">
                    <label for={setting.id} class="text-sm font-medium text-white">
                        {setting.label}
                    </label>

                    {#if setting.type === 'select'}
                        <select
                            id={setting.id}
                            bind:value={setting.value}
                            on:change={() => handleSettingChange(activeTab, id, setting.value)}
                            class="mt-1 block w-full pl-3 pr-10 py-2 bg-neutral-800 text-base border border-gray-300 rounded-md 
                                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        >
                            {#each setting.options as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>

                    {:else if setting.type === 'toggle'}
                        <div class="flex items-center">
                            <button
                                type="button"
                                on:click={() => {
                                    setting.value = !setting.value;
                                    handleSettingChange(activeTab, id, setting.value);
                                }}
                                class={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                                    ${setting.value ? 'bg-emerald-600' : 'bg-gray-200'}`}
                                role="switch"
                                aria-checked={setting.value}
                            >
                                <span
                                    class={`pointer-events-none inline-block h-5 w-5 transform rounded-full 
                                        bg-white shadow ring-0 transition duration-200 ease-in-out
                                        ${setting.value ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>

                    {:else if setting.type === 'textarea'}
                        <textarea
                            id={setting.id}
                            bind:value={setting.value}
                            on:blur={() => handleSettingChange(activeTab, id, setting.value)}
                            class="mt-1 block w-full rounded-md border bg-neutral-800 border-gray-300 shadow-sm py-2 px-3 
                                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                                sm:text-sm min-h-32"
                        />

                    {:else}
                        <input
                            type="text"
                            id={setting.id}
                            bind:value={setting.value}
                            on:blur={() => handleSettingChange(activeTab, id, setting.value)}
                            class="mt-1 block w-full rounded-md border bg-neutral-800 border-gray-300 shadow-sm py-2 px-3 
                                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                                sm:text-sm"
                        />
                    {/if}

                    <p class="mt-2 text-sm text-emerald-900">
                        {setting.description}
                    </p>
                </div>
            </div>
        {/each}
    </div>
</div>