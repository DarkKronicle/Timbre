<script>
	import Navbar from '../components/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<slot />

<style>
	:global(:root) {
		--bg-black: #121212;
		--bg-highlight: #1a1a1a;
		--bg-elevated-base: #242424;
		--bg-elevated-highlight: #2a2a2a;
		--color-white: #ffffff;
		--text-subdued: #a7a7a7;
		--color-primary: #1da1b9;
	}

	:global(html) {
		height: 100%;
	}
	:global(body) {
		background-image: linear-gradient(var(--bg-elevated-highlight), var(--bg-black));
		background-repeat: no-repeat;
		background-size: 100% 100%;
        overflow-x: hidden;
		/* background-color: var(--bg-black); */
	}

	* {
		font-family: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';
	}
</style>
