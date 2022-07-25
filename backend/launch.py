import server
import asyncio
from config import Config
import pathlib
import tekore as tk


config: Config = None
cred: tk.Credentials = None
sp: tk.Spotify = None


def run():
    global config, cred, sp

    config = Config(pathlib.Path('../config.toml'))
    tk.client_id_var = config['client_id']
    tk.client_secret_var = config['client_secret']
    tk.redirect_uri_var = config['redirect_uri']

    sp = tk.Spotify(asynchronous=True, chunked_on=True, max_limits_on=True)
    cred = tk.Credentials(config['client_id'], config['client_secret'], config['redirect_uri'], asynchronous=True)
    back = server.Server(config['backend']['websocket_port'])
    asyncio.run(back.run_server())


if __name__ == '__main__':
    run()
