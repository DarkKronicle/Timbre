/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}

	interface Config {
		frontend: {
			http_port: number;
			https_port: number;
			websocket_port: number;
		},
		backend: {
			websocket_port: number;
			client_id: string;
			client_secret: string;
			redirect_uri: string;
			scope: string;
		}
	}
}
