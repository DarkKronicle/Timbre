import fetch, { FormData } from 'node-fetch';
import getConfig from './config';
import Util from './util';
import DatabaseManager from './databseManager';

export default class Auth {
	public static async genAuthLink() {
		const params = new URLSearchParams();
		params.append('client_id', getConfig().backend.client_id);
		params.append('redirect_uri', getConfig().backend.redirect_uri);
		params.append('response_type', 'code');
		params.append('scope', getConfig().backend.scope);
		params.append('state', await Util.GenCode(16));
        console.log(params.toString())
        return `https://accounts.spotify.com/authorize?${params.toString()}`;
	}

	public static async onCallback(
		code: string,
		state: string
	): Promise<
		| {
				success: true;
				token: string;
				refreshToken: string;
		  }
		| {
				success: false;
				error: string;
		  }
	> {
		const authCode = await DatabaseManager.db.authCode.findFirst({
			where: {
				code: state
			}
		});

		if (!authCode) {
			return {
				success: false,
				error: 'Invalid auth code'
			};
		}

		const form = new FormData();
		form.append('grant_type', 'authorization_code');
		form.append('code', code);
		form.append('redirect_uri', getConfig().backend.redirect_uri);

		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${getConfig().backend.client_id}:${getConfig().backend.client_secret}`
				).toString('base64')}`
			},
			body: form
		});

		if (res.status !== 200) {
			return {
				success: false,
				error: 'Invalid auth code'
			};
		}

		const json = (await res.json()) as {
			access_token: string;
			token_type: string;
			scope: string;
			expires_in: number;
			refresh_token: string;
		};

		return {
			success: true,
			token: json.access_token,
			refreshToken: json.refresh_token
		};
	}
}
