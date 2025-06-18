<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import Account from './Account.svelte';


	let { showModal = $bindable(), refreshKey } = $props<{
        showModal?: boolean;
        refreshKey?: number;
    }>();

	let chatHistory = $state([]);

	async function fetchChats() {
		const res = await fetch('/api/history');
		chatHistory = await res.json();
	}

	$effect(() => {
		refreshKey;
		void fetchChats();
	});
</script>

<Sidebar.Root>
	<div class="mt-6">
		<Sidebar.Header>
			<div class="absolute left-4 top-4 z-50">
				<Sidebar.MenuButton>
					<Sidebar.Trigger />
				</Sidebar.MenuButton>
			</div>
		</Sidebar.Header>
	</div>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<div class="outline-solid rounded-md mb-2 mt-2">
							<Sidebar.MenuButton>
								<a href="/" data-sveltekit-reload>
									<span>New chat</span>
								</a>
							</Sidebar.MenuButton>
						</div>
					</Sidebar.MenuItem>

					<Sidebar.GroupLabel>Chat history</Sidebar.GroupLabel>
					{#each chatHistory as chat (chat)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="/chat/{chat.chatid}" {...props} data-sveltekit-reload>
										<span>{chat.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<div class="outline-solid rounded-md">
		<Sidebar.Footer>
			<Account bind:showModal />
		</Sidebar.Footer>
	</div>
</Sidebar.Root>
