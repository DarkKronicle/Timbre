import generator
import server
import asyncio
from config import Config
import pathlib


def run():
    config = Config(pathlib.Path('../config.toml'))
    back = server.Server(config['backend']['websocket_port'])
    asyncio.run(back.run_server())


if __name__ == '__main__':
    run()
