import generator
import server
import asyncio


def run():
    back = server.Server()
    asyncio.run(back.run_server())


if __name__ == '__main__':
    run()
