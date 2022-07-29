import DatabaseManager from './databseManager';

export default class Util {
	public static async GenCode(length: number): Promise<string> {
		let code = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++)
			code += possible.charAt(Math.floor(Math.random() * possible.length));

		if (
			await DatabaseManager.db.authCode.findFirst({
				where: {
					code
				}
			})
		) {
			return await Util.GenCode(length);
		}

		DatabaseManager.db.authCode.create({
			data: {
				code
			}
		});

		return code;
	}
}
