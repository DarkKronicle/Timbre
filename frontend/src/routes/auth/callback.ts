import Auth from '../../_private/modules/auth';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url }: { url: URL }) {
		const qs =  url.searchParams;

		const code = qs.get('code');
		const state = qs.get('state');

		if (code && state) {
			const token = await Auth.onCallback(code, state);
            console.log(token)
		}

		return {
			status: 301,
			headers: {
				'access-control-allow-origin': '*',
				location: '/'
			}
		};
}
