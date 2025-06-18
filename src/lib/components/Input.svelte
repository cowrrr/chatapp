<script lang="ts">
	let { chat = $bindable(), onclick } = $props();
	let selectedModel = $state('gemini-2.5-flash-preview-04-17');

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if (!chat.input?.trim()) return;

		// Pass the selected model to the chat
		chat.handleSubmit(e, {
			body: {
				model: selectedModel
			}
		});
	};
</script>

<form
	class="opacity-95 flex flex-col gap-3 p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl w-full"
	onsubmit={handleSubmit}
>
	<!-- Input and Send Button -->
	<div class="flex items-center gap-2">
		<input
			class="flex-1 px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
			bind:value={chat.input}
			placeholder="Type your message..."
		/>
		<button
			class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
			type="submit"
			disabled={!chat.input?.trim()}
            onclick={() => onclick()}
		>
			Send
		</button>
	</div>

	<!-- Model Selection -->
	<div class="flex items-center gap-2">
		<select
			id="model-select"
			bind:value={selectedModel}
			class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
		>
			<option value="gemini-2.5-pro-preview-05-06">Gemini 2.5 Pro</option>
			<option value="gemini-2.5-flash-preview-04-17">Gemini 2.5 Flash</option>
		</select>
	</div>
</form>
