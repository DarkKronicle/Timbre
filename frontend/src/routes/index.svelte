<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.getElementById('main')?.classList.toggle('selected');
	});
</script>

<main>
	<div id="container">
		<h1 id="welcome"> Welcome to </h1>
		<h1 id="important"> Timbre </h1>
        <p class="mt-6">
            Imagine daily mixes, but 100 times better.
        </p>
        <div id="coolstuff">
            <span>
                Automatic playlists with recommendations
            </span>
            <span>
                Fine tuning
            </span>
            <span>
                Generating
            </span>
            <span>
                Sorting
            </span>
            <span>
                and much, much more...
            </span>
        </div>
	</div>
</main>

<style>
	* {
		color: var(--text-subdued);
	}
    #coolstuff {
        margin: 1rem;
    }
    #coolstuff > span {
        margin: 0 1.5rem;
        display: block;
    }
	main {
        font-size: 1.15rem;
		display: flex;
		place-items: center;
		justify-content: center;
		text-align: center;
	}
	#container {
		margin-top: 4rem;
	}
	#welcome {
		font-size: 2.5rem;
	}
	#important {
		color: var(--color-white);
		animation: 3.5s glow infinite alternate;
		font-size: 3rem;
	}
    @keyframes glow {
        0%, 16%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: 
                0 0 7px var(--color-white),
                0 0 10px var(--color-white),
                0 0 21px var(--color-white),
                0 0 42px var(--color-primary),
                0 0 82px var(--color-primary),
                0 0 92px var(--color-primary),
                0 0 102px var(--color-primary),
                0 0 151px var(--color-primary);
        }
        20%, 24%, 55% {
            text-shadow: none;
        }
    }
</style>
