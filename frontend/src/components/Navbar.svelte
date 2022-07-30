<script>
	const navigation = [
		{ name: 'Main', link: '/' },
		{ name: 'About', link: '/about' },
		{ name: 'Build', link: '/build' }
	];
</script>

<nav>
	<div id="logo">
		<span>T</span>
		<span>imbre</span>
	</div>
	{#each navigation as link}
		<a id={link.name.toLowerCase()} href={link.link}> {link.name}</a>
	{/each}
    <div class="w-0.5 h-8 bg-white"></div>
    <a id="login">Login</a>
</nav>

<style>
	nav {
		width: 100%;
		padding: 1.25rem 0 1.25rem 1rem;
		display: flex;
		justify-content: flex-end;
		place-items: center;
		background-color: rgba(0, 0, 0, 0.25);
	}
	nav > #logo {
		margin-right: auto;
		font-style: italic;
		text-align: center;
		font-weight: 700;
		font-size: 1.1rem;
		padding: 0 0.75rem;
		color: var(--color-primary);
	}
	nav > #logo > span:first-child {
		margin-right: -4.5px;
	}
	nav > a {
		color: var(--text-subdued);
		text-align: center;
		font-weight: 600;
		font-size: 1.075rem;
		padding: 0 0.75rem;
		transition: all 0.25s ease-in-out;
	}
    nav > a:hover {
		color: var(--color-white);
		transform: scale(1.04);
	}
    nav > #login {
        cursor: pointer;
        color: #000;
        padding: 0.35rem 0.75rem;
		margin: 0 0.75rem;
        background-color: var(--text-subdued);
        border-radius: 100vmax;
    }
    nav > #login:hover {
        background-color: var(--color-white);
        color: var(--color-primary);
    }
	:global(nav > a.selected) {
		color: var(--color-white) !important;
	}
</style>
