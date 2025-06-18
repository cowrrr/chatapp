<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();

    let { showModal = $bindable() } = $props();
</script>

{#if $session.data}
<DropdownMenu.Root>
	<DropdownMenu.Trigger class="cursor-pointer">
			<div class="flex p-3">
				<div class="flex-none">
					<Avatar.Root>
						<Avatar.Image src={$session?.data?.user.image} alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</div>
				<div class="ml-4">
					<p>
						{$session?.data?.user.name}
					</p>
				</div>
			</div>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="cursor-pointer">
                <button
				onclick={async () => {
					await authClient.signOut();
				}}
				>Log out
                </button>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
{:else}
        <button class="p-3 flex justify-start cursor-pointer" onclick={() => (showModal = true)}>Log in
        </button>
{/if}
