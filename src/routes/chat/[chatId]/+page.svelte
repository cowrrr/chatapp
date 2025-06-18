<script lang="ts">
	import Response from '$lib/components/Response.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Chat, type Message } from '@ai-sdk/svelte';
	import type { PageProps } from '../$types';
	import Sidebar from '$lib/components/app-sidebar.svelte';
	import * as CollapseBtn from '$lib/components/ui/sidebar/index.js';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { onMount } from 'svelte';

	let showModal = $state(false);

	let { data }: PageProps = $props();

    let refreshKey = $state(0)

	let initialMessages: Message[] = (data as any).initialMessages;
	const chat = new Chat({
		initialMessages
	});

	// Bind to the scrollable container with proper typing
	let scrollContainer = $state<HTMLDivElement>();

	const scrollToBottom = (node: HTMLDivElement | undefined) => {
		if (node) {
			node.scrollTo({
				top: node.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

    function triggerSBrefresh() {
        refreshKey++;
    }

	onMount(() => {
		if (scrollContainer) {
			scrollToBottom(scrollContainer);
		}
	});

	$effect(() => {
		if (chat.messages && scrollContainer) {
			setTimeout(() => scrollToBottom(scrollContainer), 0);
		}
	});
</script>

<div class="relative flex h-screen w-screen flex-col bg-gray-100">
	{#if showModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/65">
			<div class="relative">
				<!-- Close button -->
				<button
					class="absolute -top-2 -right-2 z-10 rounded-full bg-white p-1 shadow-lg hover:bg-gray-100 cursor-pointer"
					aria-label="Close login modal"
					onclick={() => (showModal = false)}
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<LoginModal />
			</div>
		</div>
	{/if}

	<div class="fixed left-0 top-0 z-40">
		<Sidebar bind:showModal {refreshKey} />
	</div>

	<div class="fixed left-4 top-4">
		<CollapseBtn.Trigger />
	</div>

	<div
		bind:this={scrollContainer}
		class="flex-1 overflow-auto pb-40 pt-10 transition-all duration-300 ease-in-out px-4 px-120"
	>
		<Response {chat} />
	</div>

	<div class="pointer-events-auto absolute bottom-0 z-10 w-full px-2 mb-3">
		<div class="relative mx-auto flex w-full max-w-3xl flex-col text-center">
			<Input {chat} onclick={triggerSBrefresh}/>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
