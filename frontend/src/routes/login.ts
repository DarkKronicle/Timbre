/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    return {
      status: 301,
      headers: {
        'access-control-allow-origin': '*',
        location: "/auth/login"
      },
    };
  }