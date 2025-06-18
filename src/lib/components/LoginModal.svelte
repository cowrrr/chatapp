<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
    import { authClient } from '$lib/auth-client';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Login</Card.Title>
        <Card.Description>Login in with social provider</Card.Description>
	</Card.Header>
	<Card.Content>
		<button
			class="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
		 on:click={async () => {
            await authClient.signIn.social({
              provider: "github",
            });
          }}>
			<!-- GitHub SVG Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-6 w-6"
			>
				<path
					fill-rule="evenodd"
					d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.196.084 1.834 1.228 1.834 1.228 1.065 1.833 2.792 1.305 3.475.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.22-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.839 1.236 1.909 1.236 3.22 0 4.609-2.807 5.624-5.479 5.922.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.56 21.79 24 17.29 24 12 24 5.373 18.627 0 12 0Z"
					clip-rule="evenodd"
				/>
			</svg>
			<span>Login with GitHub</span>
		</button>
	</Card.Content>
</Card.Root>
