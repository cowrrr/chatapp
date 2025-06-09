<script lang="ts">
    let { chat = $bindable(), } = $props();
</script>

<form class="flex items-center gap-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl w-full" onsubmit={chat.handleSubmit}>
	<input 
		class="flex-1 px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400" 
		bind:value={chat.input} 
		placeholder="Type your message..."
	/>
	<button 
		class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
		type="submit"
		disabled={!chat.input?.trim()}
	>
		Send
	</button>
</form>
