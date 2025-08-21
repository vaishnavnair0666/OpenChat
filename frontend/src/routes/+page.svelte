<script lang="ts">
	let log: string[] = [];
	let ws: WebSocket | null = null;

	function connect() {
		ws = new WebSocket('ws://localhost:5000');
		ws.onopen = () => {
			log = [...log, 'ws open'];
			ws?.send('ping');
		};
		ws.onmessage = (ev) => {
			log = [...log, `recv: ${ev.data}`];
		};
		ws.onclose = () => (log = [...log, 'ws closed']);
	}
</script>

<button on:click={connect}>Connect WS</button>
<ul>
	{#each log as line}<li>{line}</li>{/each}
</ul>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
