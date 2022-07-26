import generator
import tekore as tk


def create_spotify():
    return tk.Spotify(asynchronous=True, chunked_on=True, max_limits_on=True)


async def run_instruction(token: str, data: dict):
    sp = create_spotify()
    with sp.token_as(token):
        tracks = await generator.instruction.run(sp, data)
    return tracks
