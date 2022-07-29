import asyncio
import json
import spotify_request


class Server:

    def __init__(self, port):
        self.port = port

    async def process_instruction(self, data: dict, writer, upload):
        content = data['data']
        if not upload:
            content.pop('upload')
        tracks = await spotify_request.run_instruction(data['user_token'], content)
        writer.write(json.dumps(tracks))

    async def process_data(self, data: dict, writer):
        match (data['type']):
            case 'request_instruction':
                await self.process_instruction(data, writer, False)
                return
            case 'upload_instruction':
                await self.process_instruction(data, writer, True)
                return

    async def handle_client(self, reader, writer):
        response = bytearray()
        while True:
            chunk = await reader.read(100)
            if not chunk:
                break
            response += chunk
        data = response.decode('utf8')
        json_data = json.loads(data)
        if not isinstance(json_data, list):
            json_data = [json_data]
        for j in json_data:
            await self.process_data(j, writer)
        # Drain to be safe
        await writer.drain()
        writer.close()

    async def run_server(self):
        server = await asyncio.start_server(self.handle_client, 'localhost', self.port)
        addrs = ', '.join(str(sock.getsockname()) for sock in server.sockets)
        print(f'Serving on {addrs}')
        async with server:
            await server.serve_forever()
