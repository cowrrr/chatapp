<script lang="ts">
	import Header from './Header.svelte';
	import Response from './Response.svelte';
	import Input from './Input.svelte';

	import { Chat } from '@ai-sdk/svelte';
	const chat = new Chat();
</script>

<div class="flex h-screen w-screen flex-col bg-gray-100">
	<Header />

	<div class="flex-1 px-40 overflow-auto">
		<Response {chat} />
	</div>

	<div class="sticky bottom-0 flex justify-center mb-5">
		<Input {chat} />
	</div>
</div>

<style lang="postcss">
</style>
