import generator
import asyncio
import json


class Server:

    def __init__(self, port):
        self.port = port

    async def process_data(self, data: dict, writer):
        pass

    async def handle_client(self, reader, writer):
        response = bytearray()
        while True:
            chunk = await reader.read(100)
            if not chunk:
                break
            response += chunk
        data = response.decode('utf8')
        json_data = json.loads(data)
        await self.process_data(json_data, writer)
        # Drain to be safe
        await writer.drain()
        writer.close()

    async def run_server(self):
        server = await asyncio.start_server(self.handle_client, 'localhost', self.port)
        addrs = ', '.join(str(sock.getsockname()) for sock in server.sockets)
        print(f'Serving on {addrs}')
        async with server:
            await server.serve_forever()
