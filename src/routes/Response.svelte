<script lang="ts">
	let { chat = $bindable() } = $props();

	import { marked } from 'marked';

	marked.setOptions({
		breaks: true,
		gfm: true
	});
</script>

<main>
	<ul class="space-y-4">
		{#each chat.messages as message, messageIndex (messageIndex)}
			<li class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
				<div
					class="max-w-full p-3 rounded-lg {message.role === 'user'
						? 'bg-blue-500 text-white'
						: 'bg-gray-200 text-gray-800'}"
				>
					<div
						class="text-xs font-semibold mb-1 {message.role === 'user'
							? 'text-blue-100'
							: 'text-gray-600'}"
					>
						{message.role}
					</div>
					<div>
						{#each message.parts as part, partIndex (partIndex)}
							{#if part.type === 'text'}
								<div class="prose prose-sm max-w-none">
									{@html marked(part.text)}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
