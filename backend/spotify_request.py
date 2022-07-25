import generator
from launch import sp


async def run_instruction(token: str, data: dict):
    with sp.token_as(token):
        tracks = await generator.instruction.run(sp, data)
    return tracks
